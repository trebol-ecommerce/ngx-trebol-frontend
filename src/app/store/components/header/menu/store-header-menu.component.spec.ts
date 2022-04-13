/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, of } from 'rxjs';
import { ProfileService } from 'src/app/profile.service';
import { SessionService } from 'src/app/session.service';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { StoreHeaderMenuComponent } from './store-header-menu.component';

describe('StoreHeaderMenuComponent', () => {
  let component: StoreHeaderMenuComponent;
  let fixture: ComponentFixture<StoreHeaderMenuComponent>;
  let mockSessionService: Partial<SessionService>;
  let mockProfileService: Partial<ProfileService>;
  let mockDialogService: Partial<MatDialog>;
  let mockSharedDialogService: Partial<SharedDialogService>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync( () => {
    mockSessionService = {
      userHasActiveSession$: EMPTY,
      closeCurrentSession() {},
      fetchAuthorizedAccess() { return of(void 0); }
    };
    mockProfileService = {
      userName$: of(''),
      getUserProfile() { return of(null); }
    };
    mockDialogService = {
      open() { return void 0; }
    };
    mockSharedDialogService = {
      requestConfirmation() { return of(true); }
    };
    mockSnackBarService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [ StoreHeaderMenuComponent ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: SharedDialogService, useValue: mockSharedDialogService },
        { provide: MatSnackBar, useValue: mockSnackBarService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when logged in', () => {
    beforeEach(() => {
      mockSessionService.userHasActiveSession$ = of(true);
    });

    it('should prompt a confirmation before trying to logout', () => {
      const confirmationSpy = spyOn(mockSharedDialogService, 'requestConfirmation').and.returnValue(EMPTY);
      component.onClickLogout();
      expect(confirmationSpy).toHaveBeenCalled();
    });

    it('should not logout if not confirmed', () => {
      spyOn(mockSharedDialogService, 'requestConfirmation').and.returnValue(of(false));
      const logoutSpy = spyOn(mockSessionService, 'closeCurrentSession');
      component.onClickLogout();
      expect(logoutSpy).not.toHaveBeenCalled();
    });

    it('should logout only if confirmed', () => {
      spyOn(mockSharedDialogService, 'requestConfirmation').and.returnValue(of(true));
      const logoutSpy = spyOn(mockSessionService, 'closeCurrentSession');
      component.onClickLogout();
      expect(logoutSpy).toHaveBeenCalled();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      mockSessionService.userHasActiveSession$ = of(false);
    });

    it('should never logout', () => {
      spyOn(mockSharedDialogService, 'requestConfirmation').and.returnValue(of(true));
      const logoutSpy = spyOn(mockSessionService, 'closeCurrentSession');
      component.onClickLogout();
      expect(logoutSpy).not.toHaveBeenCalled();
    });
  });
});

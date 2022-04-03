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
import { of } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization.service';
import { ProfileService } from 'src/app/profile.service';
import { SessionService } from 'src/app/session.service';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { StoreHeaderMenuComponent } from './store-header-menu.component';

describe('StoreHeaderMenuComponent', () => {
  let component: StoreHeaderMenuComponent;
  let fixture: ComponentFixture<StoreHeaderMenuComponent>;
  let mockAuthorizationService: Partial<AuthorizationService>;
  let mockSessionService: Partial<SessionService>;
  let mockProfileService: Partial<ProfileService>;
  let mockDialogService: Partial<MatDialog>;
  let mockSharedDialogService: Partial<SharedDialogService>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync( () => {
    mockAuthorizationService = {
      getAuthorizedAccess() { return of(void 0); }
    };
    mockSessionService = {
      userHasActiveSession$: of(false),
      closeCurrentSession() {}
    };
    mockProfileService = {
      userName$: of(''),
      getUserProfile() { return of(null); }
    };
    mockDialogService = {
      open() { return void 0; }
    };
    mockSharedDialogService = {
      requestConfirmation() { return of(false); }
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
        { provide: AuthorizationService, useValue: mockAuthorizationService },
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

  // TODO please uncomment and fix this unit test ASAP
  // it('should do nothing when clicking in the logout option while not logged in', () => {
  //   const confirmationSpy = spyOn(mockSharedDialogService, 'requestConfirmation').and.callThrough();
  //   // isLoggedIn is false here
  //   component.onClickLogout();
  //   expect(confirmationSpy).not.toHaveBeenCalled();
  // });

  it('should prompt a confirmation when clicking in the logout option while logged in', () => {
    const confirmationSpy = spyOn(mockSharedDialogService, 'requestConfirmation').and.callThrough();
    mockSessionService.userHasActiveSession$ = of(true);
    component.onClickLogout();
    expect(confirmationSpy).toHaveBeenCalled();
    mockSessionService.userHasActiveSession$ = of(false);
  });
});

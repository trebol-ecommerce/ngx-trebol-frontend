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
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let sharedDialogServiceSpy: jasmine.SpyObj<SharedDialogService>;
  let snackBarServiceSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(waitForAsync( () => {
    const sessionServiceSpy = jasmine.createSpyObj('SessionService', ['closeCurrentSession', 'fetchAuthorizedAccess']);
    const mockProfileService = jasmine.createSpyObj('ProfileService', ['getUserProfile']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);
    const mockSharedDialogService = jasmine.createSpyObj('SharedDialogService', ['requestConfirmation']);
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [ StoreHeaderMenuComponent ],
      providers: [
        { provide: SessionService, useValue: sessionServiceSpy },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: SharedDialogService, useValue: mockSharedDialogService },
        { provide: MatSnackBar, useValue: mockSnackBarService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    profileServiceSpy = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    sharedDialogServiceSpy = TestBed.inject(SharedDialogService) as jasmine.SpyObj<SharedDialogService>;
    snackBarServiceSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    profileServiceSpy.userName$ = of('');
    sessionServiceSpy.authorizedAccess$ = of({ routes: [] });

    fixture = TestBed.createComponent(StoreHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when logged in', () => {
    beforeEach(() => {
      sessionServiceSpy.userHasActiveSession$ = of(true);
    });

    it('should prompt a confirmation before trying to logout', () => {
      sharedDialogServiceSpy.requestConfirmation.and.returnValue(EMPTY);
      component.onClickLogout();
      expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    });

    it('should not logout if not confirmed', () => {
      sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(false));
      component.onClickLogout();
      expect(sessionServiceSpy.closeCurrentSession).not.toHaveBeenCalled();
    });

    it('should logout only if confirmed', () => {
      sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
      component.onClickLogout();
      expect(sessionServiceSpy.closeCurrentSession).toHaveBeenCalled();
    });
  });

  describe('when not logged in', () => {
    beforeEach(() => {
      sessionServiceSpy.userHasActiveSession$ = of(false);
    });

    it('should never logout', () => {
      sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
      component.onClickLogout();
      expect(sessionServiceSpy.closeCurrentSession).not.toHaveBeenCalled();
    });
  });
});

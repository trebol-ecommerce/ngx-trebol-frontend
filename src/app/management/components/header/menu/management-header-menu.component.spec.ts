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
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { ProfileService } from 'src/app/profile.service';
import { SessionService } from 'src/app/session.service';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { ManagementHeaderMenuComponent } from './management-header-menu.component';

describe('ManagementHeaderMenuComponent', () => {
  let component: ManagementHeaderMenuComponent;
  let fixture: ComponentFixture<ManagementHeaderMenuComponent>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let sharedDialogServiceSpy: jasmine.SpyObj<SharedDialogService>;

  beforeEach(waitForAsync(() => {
    const mockSessionService = jasmine.createSpyObj('SessionService', ['closeCurrentSession']);
    const mockProfileService = jasmine.createSpyObj('ProfileService', ['watchUserName']);
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', [ 'open' ]);
    const mockSharedDialogService = jasmine.createSpyObj('SharedDialogService', ['requestConfirmation']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [
        ManagementHeaderMenuComponent
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    profileServiceSpy = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    sharedDialogServiceSpy = TestBed.inject(SharedDialogService) as jasmine.SpyObj<SharedDialogService>;

    profileServiceSpy.watchUserName.and.returnValue(of(''));
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(EMPTY);

    fixture = TestBed.createComponent(ManagementHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog to edit the user\'s profile info', () => {
    component.onClickEditProfile();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
  });

  it('should request a confirmation before logging out', () => {
    component.onClickLogout();
    expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    expect(sessionServiceSpy.closeCurrentSession).not.toHaveBeenCalled();
  });

  it('should log out the user', () => {
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
    component.onClickLogout();
    expect(sessionServiceSpy.closeCurrentSession).toHaveBeenCalled();
  });
});

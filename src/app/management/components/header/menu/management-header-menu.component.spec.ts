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
import { SessionService } from 'src/app/session.service';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { ProfileService } from 'src/app/profile.service';
import { ManagementHeaderMenuComponent } from './management-header-menu.component';

describe('ManagementHeaderMenuComponent', () => {
  let component: ManagementHeaderMenuComponent;
  let fixture: ComponentFixture<ManagementHeaderMenuComponent>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let snackBarServiceSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let sharedDialogServiceSpy: jasmine.SpyObj<SharedDialogService>;

  beforeEach(waitForAsync(() => {
    const mockSessionService = jasmine.createSpyObj('SessionService', ['closeCurrentSession']);
    const mockProfileService = jasmine.createSpyObj('ProfileService', ['userName$']);
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
    snackBarServiceSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    sharedDialogServiceSpy = TestBed.inject(SharedDialogService) as jasmine.SpyObj<SharedDialogService>;

    profileServiceSpy.userName$ = of('');
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(EMPTY);

    fixture = TestBed.createComponent(ManagementHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { StoreHeaderMenuComponent } from './store-header-menu.component';

describe('StoreHeaderMenuComponent', () => {
  let component: StoreHeaderMenuComponent;
  let fixture: ComponentFixture<StoreHeaderMenuComponent>;
  let mockAppService: Partial<AppService>;
  let mockDialogService: Partial<MatDialog>;
  let mockSharedDialogService: Partial<SharedDialogService>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync( () => {
    mockAppService = {
      userName$: of(''),
      isLoggedIn$: of(false),
      closeCurrentSession() {},
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
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [ StoreHeaderMenuComponent ],
      providers: [
        { provide: AppService, useValue: mockAppService },
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

  it('should do nothing when clicking in the logout option while not logged in', () => {
    const confirmationSpy = spyOn(mockSharedDialogService, 'requestConfirmation').and.callThrough();
    // isLoggedIn is false here
    component.onClickLogout();
    expect(confirmationSpy).not.toHaveBeenCalled();
  });

  it('should prompt a confirmation when clicking in the logout option while logged in', () => {
    const confirmationSpy = spyOn(mockSharedDialogService, 'requestConfirmation').and.callThrough();
    mockAppService.isLoggedIn$ = of(true);
    component.onClickLogout();
    expect(confirmationSpy).toHaveBeenCalled();
  });
});

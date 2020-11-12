// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, empty, EMPTY } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreService } from '../store.service';
import { StoreHeaderComponent } from './store-header.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { StoreCompanyDetailsDialogComponent } from '../dialogs/company-details/store-company-details-dialog.component';
import { StoreLoginFormDialogComponent } from '../dialogs/login-form/store-login-form-dialog.component';

describe('StoreHeaderComponent', () => {
  let component: StoreHeaderComponent;
  let fixture: ComponentFixture<StoreHeaderComponent>;
  let storeService: Partial<StoreService>;
  let appService: Partial<AppService>;
  let dialogService: any;

  beforeEach(waitForAsync(() => {
    storeService = {
      cartDetails$: of([]),
      cartItemCount$: of(0),
      cartSubtotalValue$: of(0)
    };
    appService = {
      isLoggedIn() { return false; },
      isLoggedInChanges$: of(false),
      closeCurrentSession() {},
      getUserProfile() { return of(null); }
    };
    dialogService = {
      open() { return { afterClosed: () => EMPTY }; }
    };
    spyOn(dialogService, 'open').and.callThrough();

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule
      ],
      declarations: [ StoreHeaderComponent ],
      providers: [
        { provide: StoreService, useValue: storeService },
        { provide: AppService, useValue: appService },
        { provide: MatDialog, useValue: dialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prompt a login dialog', () => {
    component.onClickLogIn();
    expect(dialogService.open).toHaveBeenCalled();
  });

  it('should prompt a logout confirmation, only when logged in', () => {
    component.onClickLogout();
    expect(dialogService.open).not.toHaveBeenCalled();

    appService.isLoggedInChanges$ = of(true);
    appService.isLoggedIn = (() => true);
    component.onClickLogout();
    expect(dialogService.open).toHaveBeenCalled();
  });
});

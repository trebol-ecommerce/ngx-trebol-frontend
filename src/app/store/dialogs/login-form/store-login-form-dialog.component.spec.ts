/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreLoginFormDialogComponent } from './store-login-form-dialog.component';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent {}

@Component({ selector: 'app-dialog-switcher-button' })
class MockDialogSwitcherButtonComponent {}

describe('StoreLoginFormDialogComponent', () => {
  let component: StoreLoginFormDialogComponent;
  let fixture: ComponentFixture<StoreLoginFormDialogComponent>;
  let mockDialog: Partial<MatDialogRef<StoreLoginFormDialogComponent>>;
  let mockAppService: Partial<AppService>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockDialog = {
      close() {}
    };
    mockAppService = {
      login() { return of(void 0); },
      cancelAuthentication() {}
    };
    mockSnackBarService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      declarations: [
        StoreLoginFormDialogComponent,
        MockCenteredMatSpinnerComponent,
        MockDialogSwitcherButtonComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: AppService, useValue: mockAppService }
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not submit incomplete form', () => {
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const appServiceLoginSpy = spyOn(mockAppService, 'login').and.callThrough();
    component.onSubmit();
    expect(appServiceLoginSpy).not.toHaveBeenCalled();

    component.username.setValue('test');
    expect(component.formGroup.valid).toBeFalsy();
    component.onSubmit();
    expect(appServiceLoginSpy).not.toHaveBeenCalled();

    component.formGroup.reset();
    component.password.setValue('test');
    expect(component.formGroup.valid).toBeFalsy();
    component.onSubmit();
    expect(appServiceLoginSpy).not.toHaveBeenCalled();
  });

  it('should submit correct form', () => {
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const appServiceLoginSpy = spyOn(mockAppService, 'login').and.callThrough();
    component.username.setValue('test');
    component.password.setValue('pass');
    expect(component.formGroup.valid).toBeTruthy();
    component.onSubmit();
    expect(appServiceLoginSpy).toHaveBeenCalled();
  });

  it('should not close after a failed login attempt', () => {
    mockAppService.login = () => throwError({ status: 403 });
    TestBed.overrideProvider(
      AppService,
      { useValue: mockAppService }
    ).compileComponents();
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const dialogCloseSpy = spyOn(mockDialog, 'close').and.callThrough();
    component.username.setValue('test');
    component.password.setValue('pass');
    component.onSubmit();
    expect(dialogCloseSpy).not.toHaveBeenCalled();
  });

  it('should close upon a successful login', () => {
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const dialogCloseSpy = spyOn(mockDialog, 'close').and.callThrough();
    component.username.setValue('test');
    component.password.setValue('pass');
    component.onSubmit();
    expect(dialogCloseSpy).toHaveBeenCalled();
  });

  it('should close upon cancellation', () => {
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const dialogCloseSpy = spyOn(mockDialog, 'close');
    component.onCancel();
    expect(dialogCloseSpy).toHaveBeenCalled();
  });
});

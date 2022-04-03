/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { ProfileService } from 'src/app/profile.service';
import { StoreLoginFormDialogComponent } from './store-login-form-dialog.component';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent {}

@Component({ selector: 'app-dialog-switcher-button' })
class MockDialogSwitcherButtonComponent {
  @Input() label: string;
  sourceDialogRef: MatDialogRef<any>;
  targetDialogComponent: Type<any>;
  targetDialogConfig: MatDialogConfig<any>;
}

describe('StoreLoginFormDialogComponent', () => {
  let component: StoreLoginFormDialogComponent;
  let fixture: ComponentFixture<StoreLoginFormDialogComponent>;
  let mockDialog: Partial<MatDialogRef<StoreLoginFormDialogComponent>>;
  let mockAuthenticationService: Partial<AuthenticationService>;
  let mockProfileService: Partial<ProfileService>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockDialog = {
      close() {}
    };
    mockAuthenticationService = {
      login() { return of('test'); },
      cancelAuthentication() { },
      authCancelation$: EMPTY // do not emit
    };
    mockProfileService = {
      getUserProfile() { return of(null); }
    };
    mockSnackBarService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
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
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: MatSnackBar, useValue: mockSnackBarService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit incomplete form', () => {
    const appServiceLoginSpy = spyOn(mockAuthenticationService, 'login').and.callThrough();
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
    const appServiceLoginSpy = spyOn(mockAuthenticationService, 'login').and.callThrough();
    component.username.setValue('test');
    component.password.setValue('pass');
    expect(component.formGroup.valid).toBeTruthy();
    component.onSubmit();
    expect(appServiceLoginSpy).toHaveBeenCalled();
  });

  // TODO please uncomment and fix this unit test ASAP
  // it('should not close after a failed login attempt', () => {
  //   mockAppService.login = (l: any) => throwError({ status: 403 });
  //   fixture.detectChanges();

  //   expect(component).toBeTruthy();
  //   const dialogCloseSpy = spyOn(mockDialog, 'close').and.callThrough();
  //   component.username.setValue('test');
  //   component.password.setValue('pass');
  //   try {
  //     component.onSubmit();
  //   } catch (err) {
  //     expect(err).toEqual({ status: 403 });
  //     expect(dialogCloseSpy).not.toHaveBeenCalled();
  //   }
  // });

  it('should close upon a successful login', () => {
    const dialogCloseSpy = spyOn(mockDialog, 'close').and.callThrough();
    component.username.setValue('test');
    component.password.setValue('pass');
    component.onSubmit();
    expect(dialogCloseSpy).toHaveBeenCalled();
  });

  it('should close upon cancellation', () => {
    const dialogCloseSpy = spyOn(mockDialog, 'close');
    component.onCancel();
    expect(dialogCloseSpy).toHaveBeenCalled();
  });
});

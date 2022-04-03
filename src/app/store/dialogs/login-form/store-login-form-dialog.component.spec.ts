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
import { EMPTY, of, throwError } from 'rxjs';
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
      login() { return EMPTY; },
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
    const appServiceLoginSpy = spyOn(mockAuthenticationService, 'login');
    component.onSubmit();
    expect(appServiceLoginSpy).not.toHaveBeenCalled();

    component.username.setValue('test');
    expect(component.formGroup.valid).toBeFalse();
    component.onSubmit();
    expect(appServiceLoginSpy).not.toHaveBeenCalled();

    component.formGroup.reset();
    component.password.setValue('test');
    expect(component.formGroup.valid).toBeFalse();
    component.onSubmit();
    expect(appServiceLoginSpy).not.toHaveBeenCalled();
  });

  it('should close upon cancellation', () => {
    const dialogCloseSpy = spyOn(mockDialog, 'close');
    component.onCancel();
    expect(dialogCloseSpy).toHaveBeenCalled();
  });

  describe('with complete form', () => {
    beforeEach(() => {
      component.username.setValue('test');
      component.password.setValue('pass');
    });

    it('should be valid', () => {
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should be able to submit and log-in', () => {
      const loginSpy = spyOn(mockAuthenticationService, 'login').and.returnValue(of('sometoken'));
      component.onSubmit();
      expect(loginSpy).toHaveBeenCalled();
    });

    // TODO please uncomment and fix this unit test ASAP - Second time around
    // it('should not close if logging-in fails', () => {
    //   spyOn(mockAuthenticationService, 'login').and.returnValue(throwError({ status: 403 }));
    //   const dialogCloseSpy = spyOn(mockDialog, 'close').and.callThrough();
    //   try {
    //     component.onSubmit();
    //     fail('submission was successful, but it should have failed!');
    //   } catch (err) {
    //     expect(err.status).toBe(403);
    //     expect(dialogCloseSpy).not.toHaveBeenCalled();
    //   }
    // });

    it('should close if logging-in is successful', () => {
      spyOn(mockAuthenticationService, 'login').and.returnValue(of('sometoken'));
      const dialogCloseSpy = spyOn(mockDialog, 'close');
      component.onSubmit();
      expect(dialogCloseSpy).toHaveBeenCalled();
    });
  });

});

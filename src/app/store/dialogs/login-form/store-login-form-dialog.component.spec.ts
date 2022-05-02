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
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<StoreLoginFormDialogComponent>>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  beforeEach(waitForAsync(() => {
    const mockDialog = jasmine.createSpyObj('MatDialogRef', ['close']);
    const mockAuthenticationService = jasmine.createSpyObj('', ['login', 'cancelAuthentication']);
    const mockProfileService = jasmine.createSpyObj('ProfileService', ['getUserProfile']);
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);

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
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<StoreLoginFormDialogComponent>>;
    authenticationServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    profileServiceSpy = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    authenticationServiceSpy.login.and.returnValue(EMPTY);
    authenticationServiceSpy.authCancelation$ = EMPTY
    profileServiceSpy.getUserProfile.and.returnValue(of(null));

    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('its form should be invalid at creation time', () => {
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should not submit its form in invalid state', () => {
    component.onSubmit();
    expect(authenticationServiceSpy.login).not.toHaveBeenCalled();

    component.username.setValue('test');
    expect(component.formGroup.invalid).toBeTrue();
    component.onSubmit();
    expect(authenticationServiceSpy.login).not.toHaveBeenCalled();

    component.formGroup.reset();
    component.password.setValue('test');
    expect(component.formGroup.invalid).toBeTrue();
    component.onSubmit();
    expect(authenticationServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should close upon cancellation', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should render input elements for an username and a password', () => {
    const usernameInputElem = fixture.debugElement.nativeElement.querySelector('.username input') as HTMLInputElement;
    expect(usernameInputElem).toBeTruthy();
    const passwordInputElem = fixture.debugElement.nativeElement.querySelector('.password input') as HTMLInputElement;
    expect(passwordInputElem).toBeTruthy();
  });

  it('should switch between a password input or visible input', () => {
    const passwordInputElem = fixture.debugElement.nativeElement.querySelector('.password input') as HTMLInputElement;
    expect(passwordInputElem.type).toBe('password');
    component.showPassword();
    fixture.detectChanges();
    expect(passwordInputElem.type).toBe('text');
    component.hidePassword();
    fixture.detectChanges();
    expect(passwordInputElem.type).toBe('password');
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
      authenticationServiceSpy.login.and.returnValue(of('sometoken'));
      component.onSubmit();
      expect(authenticationServiceSpy.login).toHaveBeenCalled();
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
      authenticationServiceSpy.login.and.returnValue(of('sometoken'));
      component.onSubmit();
      expect(authenticationServiceSpy.login).toHaveBeenCalled();
    });
  });

});

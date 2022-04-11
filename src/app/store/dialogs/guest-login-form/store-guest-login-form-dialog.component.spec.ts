/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { StoreCartService } from '../../store-cart.service';
import { StoreGuestLoginFormDialogComponent } from './store-guest-login-form-dialog.component';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({
  selector: 'app-person-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockPersonFormComponent }]
})
class MockPersonFormComponent
  implements ControlValueAccessor {
  onchange = (v: any) => { }
  ontouched = () => { }
  writeValue(obj: any): void { }
  registerOnChange(fn: (v: any) => any): void { this.onchange = fn; }
  registerOnTouched(fn: () => any): void { this.ontouched = fn; }
}

describe('StoreGuestLoginFormDialogComponent', () => {
  let component: StoreGuestLoginFormDialogComponent;
  let fixture: ComponentFixture<StoreGuestLoginFormDialogComponent>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;
  let cartServiceSpy: jasmine.SpyObj<StoreCartService>;

  beforeEach(waitForAsync(() => {
    const mockAuthenticationService = jasmine.createSpyObj('AuthenticationService', ['guestLogin', 'cancelAuthentication']);
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef<any>', ['close']);
    const mockCartService = jasmine.createSpyObj('StoreCartService', ['updateCheckoutRequest']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [
        StoreGuestLoginFormDialogComponent,
        MockCenteredMatSpinnerComponent,
        MockPersonFormComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: StoreCartService, useValue: mockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    authenticationServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<any>>;
    cartServiceSpy = TestBed.inject(StoreCartService) as jasmine.SpyObj<StoreCartService>;
    authenticationServiceSpy.guestLogin.and.returnValue(EMPTY);
    authenticationServiceSpy.authCancelation$ = EMPTY;

    fixture = TestBed.createComponent(StoreGuestLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close upon cancellation', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should not be valid at creation time', () => {
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should accept its fields completed as if they were valid', () => {
    component.person.setValue({ foo: 'bar' });
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should call its service `guestLogin()` when submitting a valid form', () => {
    component.person.setValue({ foo: 'bar' });
    component.onSubmit();
    expect(authenticationServiceSpy.guestLogin).toHaveBeenCalled();
  });

  it('should do nothing when submitting an invalid form', () => {
    component.onSubmit();
    expect(authenticationServiceSpy.guestLogin).not.toHaveBeenCalled();
  });

  it('should update the customer details in the cart service after a successful guest log-in', () => {
    authenticationServiceSpy.guestLogin.and.returnValue(of(void 0));
    component.person.setValue({ foo: 'bar' });
    component.onSubmit();
    expect(cartServiceSpy.updateCheckoutRequest).toHaveBeenCalled();
  });

});

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { ProfileService } from 'src/app/profile.service';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { StoreRegistrationFormDialogComponent } from './store-registration-form-dialog.component';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({
  selector: 'app-person-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockPersonFormComponent }]
})
class MockPersonFormComponent
  implements ControlValueAccessor {
  writeValue(obj: any): void { }
  registerOnChange(): void { }
  registerOnTouched(): void { }
  setDisabledState(): void { }
}

describe('StoreRegistrationFormDialogComponent', () => {
  let component: StoreRegistrationFormDialogComponent;
  let fixture: ComponentFixture<StoreRegistrationFormDialogComponent>;
  let mockMatDialogRef: Partial<MatDialogRef<StoreRegistrationFormDialogComponent>>;
  let mockAuthenticationService: Partial<AuthenticationService>;
  let mockProfileService: Partial<ProfileService>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    // TODO use jasmine.SpyObj
    mockMatDialogRef = {
      close() {}
    };
    mockAuthenticationService = {
      register(u) { return of('sometoken'); },
      cancelAuthentication() { },
      authCancelation$: EMPTY // do not emit
    };
    mockProfileService = {
      getUserProfile() { return of(null); }
    };
    mockSnackBarService = {
      open(m: string, a: string) { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule
      ],
      declarations: [
        StoreRegistrationFormDialogComponent,
        MockPersonFormComponent,
        MockCenteredMatSpinnerComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        EntityFormGroupFactoryService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRegistrationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit an incomplete form', () => {
    const registerSpy = spyOn(mockAuthenticationService, 'register').and.callThrough();

    expect(component.formGroup.invalid).toBeTrue();
    component.onSubmit();
    expect(registerSpy).not.toHaveBeenCalled();
  });

  it('should submit a correct form', () => {
    const registerSpy = spyOn(mockAuthenticationService, 'register').and.callThrough();

    component.formGroup.patchValue({
      name: 'username',
      pass1: 'password',
      pass2: 'password',
      person: {
        firstName: 'test-name',
        lastName: 'test-name',
        email: 'test-email',
        idNumber: 'test-idNumber'
      }
    });
    expect(component.formGroup.valid).toBeTrue();

    component.onSubmit();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should exit when cancelled', () => {
    const closeSpy = spyOn(mockMatDialogRef, 'close');
    component.onCancel();
    expect(closeSpy).toHaveBeenCalled();
  });
});

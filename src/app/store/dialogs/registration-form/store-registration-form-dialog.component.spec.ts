/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { iif, of, throwError } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Registration } from 'src/models/Registration';
import { CenteredMatProgressSpinnerComponent } from 'src/app/shared/components/centered-mat-spinner/centered-mat-spinner.component';
import { PersonFormComponent } from 'src/app/shared/components/person-form/person-form.component';
import { StoreRegistrationFormDialogComponent } from './store-registration-form-dialog.component';

describe('StoreRegistrationFormDialogComponent', () => {
  let component: StoreRegistrationFormDialogComponent;
  let fixture: ComponentFixture<StoreRegistrationFormDialogComponent>;
  let mockMatDialogRef: Partial<MatDialogRef<StoreRegistrationFormDialogComponent>>;
  let mockAppService: Partial<AppService>;
  let mockSnackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockMatDialogRef = {
      close() {}
    };
    mockAppService = {
      register(u) { return iif(
          () => (!!u.name && !!u.password && !!u.profile),
          of(true),
          throwError(new Error('Not an User')) );
      },
      cancelAuthentication() {}
    };
    mockSnackBarService = {
      open(m: string, a: string) { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule
      ],
      declarations: [
        StoreRegistrationFormDialogComponent,
        PersonFormComponent,
        CenteredMatProgressSpinnerComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: AppService, useValue: mockAppService },
        { provide: MatSnackBar, useValue: mockSnackBarService }
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
    let success: boolean;
    component.registering$.subscribe(s => { success = s; });

    component.onSubmit();
    expect(success).toBe(false);
  });

  it('should submit a correct form', () => {
    const registerSpy = spyOn(mockAppService, 'register').and.callThrough();

    component.formGroup.patchValue(
      {
        name: 'username',
        pass1: 'password',
        pass2: 'password',
        person: {
          firstName: 'test-name',
          lastName: 'test-name',
          email: 'test-email',
          idNumber: 'test-idNumber'
        }
      }
    );
    expect(component.formGroup.valid).toBeTruthy();

    component.onSubmit();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should exit when cancelled', () => {
    const closeSpy = spyOn(mockMatDialogRef, 'close');
    component.onCancel();
    expect(closeSpy).toHaveBeenCalled();
  });
});

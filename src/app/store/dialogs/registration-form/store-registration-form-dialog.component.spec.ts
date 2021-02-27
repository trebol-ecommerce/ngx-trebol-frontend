// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { of, iif, throwError } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { StoreRegistrationFormDialogComponent } from './store-registration-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonFormComponent } from 'src/app/shared/components/person-form/person-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Registration } from 'src/app/models/Registration';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';


describe('StoreRegistrationFormDialogComponent', () => {
  let component: StoreRegistrationFormDialogComponent;
  let fixture: ComponentFixture<StoreRegistrationFormDialogComponent>;
  let matDialogRef: Partial<MatDialogRef<StoreRegistrationFormDialogComponent>>;
  let appService: Partial<AppService>;
  let snackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    matDialogRef = {
      close() {}
    };
    appService = {
      register(u) { return iif(
          () => (u instanceof Registration),
          of(true),
          throwError(new Error('Not an User')) );
      },
      cancelAuthentication() {}
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
        PersonFormComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: AppService, useValue: appService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRegistrationFormDialogComponent);
    component = fixture.componentInstance;
    snackBarService = TestBed.inject(MatSnackBar);
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
    const dialogCloseSpy = spyOn(matDialogRef, 'close');
    const snackBarOpenSpy = spyOn(snackBarService, 'open');
    let success: boolean;

    component.registering$.pipe(
      skip(1),
      take(1)
    ).subscribe(
      s => { success = s; }
    );

    component.personForm.name.setValue('test-name');
    component.personForm.address.setValue('test-address');
    component.personForm.email.setValue('test-email');
    component.personForm.idCard.setValue('test-idcard');
    component.name.setValue('username');
    component.pass1.setValue('password');
    component.pass2.setValue('password');
    expect(component.formGroup.status).toBe('VALID');

    component.onSubmit();
    expect(success).toBe(true);
    expect(snackBarOpenSpy).toHaveBeenCalled();
    expect(dialogCloseSpy).toHaveBeenCalled();
  });

  it('should exit when cancelled', () => {
    const closeSpy = spyOn(matDialogRef, 'close');
    component.onCancel();
    expect(closeSpy).toHaveBeenCalled();
  });
});

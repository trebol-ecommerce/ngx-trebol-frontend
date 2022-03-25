/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Person } from 'src/models/entities/Person';
import { EditProfileFormDialogComponent } from './edit-profile-form-dialog.component';
import { EditProfileFormService } from './edit-profile-form.service';

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

describe('EditProfileFormDialogComponent', () => {
  let component: EditProfileFormDialogComponent;
  let fixture: ComponentFixture<EditProfileFormDialogComponent>;
  let mockService: Partial<EditProfileFormService>;
  let mockDialog: Partial<MatDialogRef<EditProfileFormDialogComponent>>;
  let mockSnackbarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    mockService = {
      saving$: of(false),
      confirmCancel$: of(false),
      loadProfile() { return of(new Person()); },
      saveProfile() { return of(true); },
      confirmCancel() { }
    };
    mockSnackbarService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        EditProfileFormDialogComponent,
        MockCenteredMatSpinnerComponent,
        MockPersonFormComponent
      ],
      providers: [
        { provide: EditProfileFormService, useValue: mockService },
        { provide: MatDialogRef, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackbarService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

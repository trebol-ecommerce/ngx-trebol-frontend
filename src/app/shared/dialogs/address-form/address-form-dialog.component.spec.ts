/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressFormDialogComponent } from './address-form-dialog.component';
import { AddressFormDialogData } from "./AddressFormDialogData";

@Component({
  selector: 'app-address-form',
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockAddressFormComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: MockAddressFormComponent }
  ]
})
class MockAddressFormComponent
  implements ControlValueAccessor, Validator {
  onchange = (v: any) => { };
  ontouched = () => { };
  writeValue() { }
  registerOnChange(fn: (v: any) => any) { this.onchange = fn; }
  registerOnTouched(fn: () => any) { this.ontouched = fn; }
  validate(control: AbstractControl): ValidationErrors { return null; }
}

describe('AddressFormDialogComponent', () => {
  let component: AddressFormDialogComponent;
  let fixture: ComponentFixture<AddressFormDialogComponent>;
  let data: Partial<AddressFormDialogData>;
  let dialogRef: Partial<MatDialogRef<AddressFormDialogComponent>>;

  beforeEach(waitForAsync(() => {
    data = {
      title: 'Example'
    };
    dialogRef = {
      close() { }
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [
        AddressFormDialogComponent,
        MockAddressFormComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogRef }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressFormDialogComponent, AddressFormDialogData } from './address-form-dialog.component';

@Component({ selector: 'app-address-form' })
class MockAddressFormComponent {
  formGroup = new FormGroup({});
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

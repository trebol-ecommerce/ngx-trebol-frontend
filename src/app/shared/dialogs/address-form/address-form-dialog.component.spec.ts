/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressFormDialogComponent, AddressFormDialogData } from './address-form-dialog.component';

describe('AddressFormDialogComponent', () => {
  let component: AddressFormDialogComponent;
  let fixture: ComponentFixture<AddressFormDialogComponent>;
  let data: Partial<AddressFormDialogData>;

  beforeEach(waitForAsync(() => {
    data = {
      title: 'Example',
      message: 'Sample text'
    };
    TestBed.configureTestingModule({
      declarations: [ AddressFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data }
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

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Address } from 'src/models/entities/Address';
import { EntityFormGroupFactoryService } from '../../entity-form-group-factory.service';
import { AddressFormComponent } from './address-form.component';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [AddressFormComponent],
      providers: [
        EntityFormGroupFactoryService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid at creation time', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should accept instances of Address as input', () => {
    const mockAddress: Address = {
      firstLine: 'first line',
      municipality: 'municipality name',
      city: 'city name',
      secondLine: '',
      notes: ''
    };
    component.writeValue(mockAddress);
    expect(component.formGroup.value).toEqual(mockAddress);
    expect(component.formGroup.valid).toBeTruthy();
  });

  it('should fail to take non-Address instance objects', () => {
    const notAnAddress = {
      foo: 'example',
      bar: 'test'
    };
    try {
      component.writeValue(notAnAddress);
    } catch (err) {
      expect(err).toBeTruthy();
    }
    component.formGroup.updateValueAndValidity();
    expect(component.formGroup.valid).toBeFalsy();
  });
});

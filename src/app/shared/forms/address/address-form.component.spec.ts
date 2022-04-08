/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Address } from 'src/models/entities/Address';
import { EntityFormGroupFactoryService } from '../../entity-form-group-factory.service';
import { AddressFormComponent } from './address-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-address-form formControlName="address"></app-address-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(AddressFormComponent, { static: true }) addressFormComponent: AddressFormComponent;

  formGroup = new FormGroup({ address: new FormControl(null) });
  get address() { return this.formGroup.get('address') as FormControl; }
}

describe('AddressFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: AddressFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        AddressFormComponent,
        MockHigherOrderFormComponent
      ],
      providers: [
        EntityFormGroupFactoryService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.addressFormComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(containerForm).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should not be valid at creation time', () => {
    expect(containerForm.formGroup.invalid).toBeTrue();
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should accept instances of Address as valid input', () => {
    const mockAddress: Address = {
      firstLine: 'first line',
      municipality: 'municipality name',
      city: 'city name',
      secondLine: '',
      notes: ''
    };
    containerForm.address.setValue(mockAddress);
    expect(component.formGroup.value).toEqual(mockAddress);
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should treat non-Address-instances as invalid input', () => {
    const notAnAddress = {
      foo: 'example',
      bar: 'test'
    };
    containerForm.address.setValue(notAnAddress);
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
  });
});

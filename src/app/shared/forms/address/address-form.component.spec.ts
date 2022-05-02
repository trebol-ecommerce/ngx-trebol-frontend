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
  });

  describe('before its first change', () => {
    it('should create', () => {
      expect(containerForm).toBeTruthy();
      expect(component).toBeTruthy();
    });

    it('should have a safe ControlValueAccesor stub implementation', () => {
      expect(() => {
        component.onChange(null);
        component.onTouched();
        component.writeValue(null);
        component.setDisabledState(false);
      }).not.toThrowError();
    });

    it('should have a safe Validator stub implementation', () => {
      expect(() => {
        component.onValidatorChange();
        component.validate(null);
      }).not.toThrowError();
    });
  });

  describe('after its first change', () => {
    let mockAddress: Address;
    beforeEach(() => {
      // TODO outsource this from a mock data array like with Products
      mockAddress = {
        firstLine: 'first line',
        municipality: 'municipality name',
        city: 'city name',
        secondLine: '',
        notes: ''
      };

      fixture.detectChanges();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should persist', () => {
      expect(containerForm).toBeTruthy();
      expect(component).toBeTruthy();
    });

    it('should not a have valid form state at creation time', () => {
      expect(containerForm.formGroup.invalid).toBeTrue();
      expect(component.formGroup.invalid).toBeTrue();
    });

    it('should propagate its value to a higher order form', () => {
      expect(containerForm.address.value).not.toEqual(mockAddress);
      component.firstLine.setValue(mockAddress.firstLine);
      component.municipality.setValue(mockAddress.municipality);
      component.city.setValue(mockAddress.city);
      component.secondLine.setValue(mockAddress.secondLine);
      component.notes.setValue(mockAddress.notes);
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.address.value).toEqual(mockAddress);
      component.formGroup.reset({ value: null });
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.address.value).not.toEqual(mockAddress);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.address.setValue(mockAddress);
      expect(component.firstLine.value).toEqual(mockAddress.firstLine);
      expect(component.municipality.value).toEqual(mockAddress.municipality);
      expect(component.city.value).toEqual(mockAddress.city);
      expect(component.secondLine.value).toEqual(mockAddress.secondLine);
      expect(component.notes.value).toEqual(mockAddress.notes);
      containerForm.address.setValue(null);
      expect(component.firstLine.value).toBeFalsy();
      expect(component.municipality.value).toBeFalsy();
      expect(component.city.value).toBeFalsy();
      expect(component.secondLine.value).toBeFalsy();
      expect(component.notes.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.formGroup.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.formGroup.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of Address as valid input', () => {
      containerForm.address.setValue(mockAddress);
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
  });
});

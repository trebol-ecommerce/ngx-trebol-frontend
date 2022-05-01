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
import { MOCK_SHIPPERS } from 'src/app/api/local-memory/mock/mock-shippers.datasource';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { ShipperFormComponent } from './shipper-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-shipper-form formControlName="shipper"></app-shipper-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ShipperFormComponent, { static: true }) shipperFormComponent: ShipperFormComponent;

  formGroup = new FormGroup({ shipper: new FormControl(null) });
  get shipper() { return this.formGroup.get('shipper') as FormControl; }
}

const mockShipper = MOCK_SHIPPERS[Math.floor(Math.random() * MOCK_SHIPPERS.length)];

describe('ShipperFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: ShipperFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        ShipperFormComponent,
        MockHigherOrderFormComponent
      ],
      providers: [ EntityFormGroupFactoryService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.shipperFormComponent;
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
    beforeEach(() => {
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
      expect(containerForm.shipper.value).not.toEqual(mockShipper);
      component.name.setValue(mockShipper.name);
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.shipper.value).toEqual(mockShipper);
      component.formGroup.reset({ value: null });
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.shipper.value).not.toEqual(mockShipper);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.shipper.setValue(mockShipper);
      expect(component.name.value).toBe(mockShipper.name);
      containerForm.shipper.reset({ value: null });
      expect(component.name.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.formGroup.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.formGroup.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of Shipper as valid input', () => {
      containerForm.shipper.setValue(mockShipper);
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should treat non-Shipper-instances as invalid input', () => {
      const notAShipper = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.shipper.setValue(notAShipper);
      expect(component.formGroup.invalid).toBeTrue();
    });
  });
});

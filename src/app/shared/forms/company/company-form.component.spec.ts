/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BillingCompany } from 'src/models/entities/BillingCompany';
import { CompanyFormComponent } from './company-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-company-form formControlName="company"></app-company-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(CompanyFormComponent, { static: true }) companyFormComponent: CompanyFormComponent;

  formGroup = new UntypedFormGroup({ company: new UntypedFormControl(null) });
  get company() { return this.formGroup.get('company') as UntypedFormControl; }
}

describe('CompanyFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: CompanyFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        CompanyFormComponent,
        MockHigherOrderFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.companyFormComponent;
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
    // TODO outsource this from a mock data array like with Products
    let mockCompany: BillingCompany;

    beforeEach(() => {
      mockCompany = {
        name: 'some-name',
        idNumber: 'some-id-number'
      };
      fixture.detectChanges();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should not be valid at creation time', () => {
      expect(containerForm.formGroup.invalid).toBeTrue();
      expect(component.formGroup.invalid).toBeTrue();
    });

    it('should propagate its value to a higher order form', () => {
      expect(containerForm.company.value).not.toEqual(mockCompany);
      component.idNumber.setValue(mockCompany.idNumber);
      component.name.setValue(mockCompany.name);
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.company.value).toEqual(mockCompany);
      component.formGroup.reset({ value: null });
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.company.value).not.toEqual(mockCompany);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.company.setValue(mockCompany);
      expect(component.idNumber.value).toEqual(mockCompany.idNumber);
      expect(component.name.value).toEqual(mockCompany.name);
      containerForm.company.setValue(null);
      expect(component.idNumber.value).toBeFalsy();
      expect(component.name.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.formGroup.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.formGroup.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of Person as valid input', () => {
      containerForm.company.setValue(mockCompany);
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should treat non-Person-instances as invalid input', () => {
      const notACompany = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.company.setValue(notACompany);
      expect(component.formGroup.invalid).toBeTrue();
    });
  });
});

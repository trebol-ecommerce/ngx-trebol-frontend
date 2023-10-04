/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BillingDetails } from 'src/models/BillingDetails';
import { BILLING_TYPE_COMPANY, BILLING_TYPE_INDIVIDUAL } from 'src/text/billing-type-names';
import { StoreBillingDetailsFormComponent } from './store-billing-details-form.component';

class MockAbstractFormComponent
  implements ControlValueAccessor {
  writeValue(obj: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
  registerOnChange(fn: (v: any) => any): void { }
  registerOnTouched(fn: () => any): void { }
}

@Component({
  selector: 'app-company-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockCompanyFormComponent }]
})
class MockCompanyFormComponent
  extends MockAbstractFormComponent { }

@Component({
  selector: 'app-address-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockAddressFormComponent }]
})
class MockAddressFormComponent
  extends MockAbstractFormComponent { }

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-store-billing-details-form formControlName="billing"></app-store-billing-details-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(StoreBillingDetailsFormComponent, { static: true }) billingFormComponent: StoreBillingDetailsFormComponent;

  formGroup = new UntypedFormGroup({ billing: new UntypedFormControl(null) });
  get billing() { return this.formGroup.get('billing') as UntypedFormControl; }
}

const mockFormData: BillingDetails = {
  typeName: BILLING_TYPE_COMPANY,
  company: {
    idNumber: 'some-id-number',
    name: 'some-name'
  },
  address: {
    city: 'some-city',
    municipality: 'some-muni',
    firstLine: 'some-addr'
  }
};

describe('StoreBillingDetailsFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: StoreBillingDetailsFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatRadioModule
      ],
      declarations: [
        MockCompanyFormComponent,
        MockAddressFormComponent,
        StoreBillingDetailsFormComponent,
        MockHigherOrderFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.billingFormComponent;
    fixture.detectChanges();
  });

  describe('before its first change', () => {
    it('should create', () => {
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
      expect(containerForm.billing.value).not.toEqual(mockFormData);
      component.typeName.setValue(mockFormData.typeName);
      component.company.setValue(mockFormData.company);
      component.address.setValue(mockFormData.address);
      expect(containerForm.billing.value).toEqual(mockFormData);
      component.formGroup.reset({ value: null });
      expect(containerForm.billing.value).not.toEqual(mockFormData);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.billing.setValue(mockFormData);
      expect(component.typeName.value).toEqual(mockFormData.typeName);
      expect(component.company.value).toEqual(mockFormData.company);
      expect(component.address.value).toEqual(mockFormData.address);
      containerForm.billing.setValue(null);
      expect(component.typeName.value).toBeFalsy();
      expect(component.company.value).toBeFalsy();
      expect(component.address.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.billing.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.billing.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of BillingDetails as valid input', () => {
      const instances: BillingDetails[] = [
        {
          typeName: BILLING_TYPE_INDIVIDUAL
        },
        mockFormData
      ];
      instances.forEach(d => {
        containerForm.billing.setValue(d);
        expect(component.formGroup.valid).toBeTrue();
      });
    });

    it('should treat non-BillingDetails-instances as invalid input', () => {
      const notBillingDetails = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.billing.setValue(notBillingDetails);
      expect(component.formGroup.invalid).toBeTrue();
    });

    it('should have its company and address fields disabled by default', () => {
      expect(component.address.disabled).toBeTrue();
      expect(component.company.disabled).toBeTrue();
    });

    it('should have its company and address fields disabled when choosing to be billed as an individual', () => {
      containerForm.billing.setValue({ typeName: BILLING_TYPE_INDIVIDUAL });
      expect(component.address.disabled).toBeTrue();
      expect(component.company.disabled).toBeTrue();
    });

    it('should have its company and address fields enabled when choosing to be billed as a company', () => {
      containerForm.billing.setValue({ typeName: BILLING_TYPE_COMPANY });
      expect(component.address.enabled).toBeTrue();
      expect(component.company.enabled).toBeTrue();
    });

    it('should treat incomplete instances of BillingDetails as invalid input', () => {
      const incompleteInstances: Partial<BillingDetails>[] = [
        {
          typeName: BILLING_TYPE_COMPANY
        },
        {
          typeName: BILLING_TYPE_COMPANY,
          company: {
            idNumber: 'some-id-number',
            name: 'some-name'
          }
        },
        {
          typeName: BILLING_TYPE_COMPANY,
          address: {
            city: 'some-city',
            municipality: 'some-muni',
            firstLine: 'some-addr'
          }
        }
      ];
      incompleteInstances.forEach(b => {
        containerForm.billing.setValue(b);
        expect(component.formGroup.invalid).toBeTrue();
      });
    });
  });
});

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BillingDetails } from 'src/models/BillingDetails';
import { BILLING_TYPE_COMPANY, BILLING_TYPE_INDIVIDUAL } from 'src/text/billing-type-names';
import { StoreBillingDetailsFormComponent } from './store-billing-details-form.component';

class MockAbstractFormComponent
  implements ControlValueAccessor {
  onchange = (v: any) => { }
  ontouched = () => { }
  writeValue(obj: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
  registerOnChange(fn: (v: any) => any): void { this.onchange = fn; }
  registerOnTouched(fn: () => any): void { this.ontouched = fn; }
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

  formGroup = new FormGroup({ billing: new FormControl(null) });
  get billing() { return this.formGroup.get('billing') as FormControl; }
}

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid at creation time', () => {
    expect(containerForm.formGroup.invalid).toBeTrue();
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should accept instances of BillingDetails as valid input', () => {
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
    containerForm.billing.setValue(mockFormData);
    expect(component.formGroup.value).toEqual(mockFormData);
    expect(component.formGroup.valid).toBeTrue();

    const mockPerson2: BillingDetails = {
      typeName: BILLING_TYPE_INDIVIDUAL
    };
    containerForm.billing.setValue(mockPerson2);
    expect(component.formGroup.value).toEqual(mockPerson2);
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should treat non-BillingDetails-instances as invalid input', () => {
    const notBillingDetails = {
      foo: 'example',
      bar: 'test'
    };
    containerForm.billing.setValue(notBillingDetails);
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
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

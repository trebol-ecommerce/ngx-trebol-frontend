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
import { ShippingDetails } from 'src/models/ShippingDetails';
import { StoreShippingDetailsFormComponent } from './store-shipping-details-form.component';

@Component({
  selector: 'app-address-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockAddressesEditorFormComponent }]
})
class MockAddressesEditorFormComponent
  implements ControlValueAccessor {
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-store-shipping-details-form formControlName="shipping"></app-store-shipping-details-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(StoreShippingDetailsFormComponent, { static: true }) shippingFormComponent: StoreShippingDetailsFormComponent;

  formGroup = new FormGroup({ shipping: new FormControl(null) });
  get shipping() { return this.formGroup.get('shipping') as FormControl; }
}

describe('StoreShippingDetailsFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: StoreShippingDetailsFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatRadioModule
      ],
      declarations: [
        StoreShippingDetailsFormComponent,
        MockAddressesEditorFormComponent,
        MockHigherOrderFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.shippingFormComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid at creation time', () => {
    expect(containerForm.formGroup.invalid).toBeTrue();
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should accept instances of ShippingDetails as valid input', () => {
    const instances: ShippingDetails[] = [
      {
        included: false
      },
      {
        included: true,
        address: {
          city: 'some-city',
          municipality: 'some-municipality',
          firstLine: 'some-line'
        }
      }
    ];
    instances.forEach(d => {
      containerForm.shipping.setValue(d);
      expect(component.formGroup.value).toEqual(d);
      expect(component.formGroup.valid).toBeTrue();
    });
  });

  it('should treat non-ShippingDetails-instances as invalid input', () => {
    const notShippingDetails = {
      foo: 'example',
      bar: 'test'
    };
    containerForm.shipping.setValue(notShippingDetails);
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
  });

  it('should have its address field disabled by default', () => {
    expect(component.address.disabled).toBeTrue();
  });

  it('should have its address field disabled when choosing not to include shipping', () => {
    const mockFormData: ShippingDetails = {
      included: false
    };
    containerForm.shipping.setValue(mockFormData);
    expect(component.address.disabled).toBeTrue();
  });

  it('should have its address field enabled when choosing to include shipping', () => {
    const mockFormData: ShippingDetails = {
      included: true
    };
    containerForm.shipping.setValue(mockFormData);
    expect(component.address.enabled).toBeTrue();
  });

  it('should treat an incomplete instance of ShippingDetails as invalid input', () => {
    const incompleteInstance: Partial<ShippingDetails> = {
      included: true
    };
    containerForm.shipping.setValue(incompleteInstance);
    expect(component.formGroup.invalid).toBeTrue();
  });
});

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { observeIfEventFiresUponCallback } from 'src/test-functions/observeIfEventFiresUponCallback';
import { BILLING_TYPE_COMPANY, BILLING_TYPE_INDIVIDUAL } from 'src/text/billing-type-names';
import { StoreCartService } from '../../store-cart.service';
import { StoreCheckoutRequestFormComponent } from './store-checkout-request-form.component';

class NoopValueAccessorComponent
  implements ControlValueAccessor {
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}

@Component({
  selector: 'app-store-billing-details-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockStoreBillingDetailsFormComponent }]
})
class MockStoreBillingDetailsFormComponent
  extends NoopValueAccessorComponent {
}

@Component({
  selector: 'app-person-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockPersonFormComponent }]
})
class MockPersonFormComponent
  extends NoopValueAccessorComponent {
}

@Component({
  selector: 'app-store-shipping-details-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockStoreShippingFormComponent }]
})
class MockStoreShippingFormComponent
  extends NoopValueAccessorComponent {
}

describe('StoreCheckoutRequestFormComponent', () => {
  let component: StoreCheckoutRequestFormComponent;
  let fixture: ComponentFixture<StoreCheckoutRequestFormComponent>;
  let cartServiceSpy: jasmine.SpyObj<StoreCartService>;

  beforeEach(waitForAsync(() => {
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);
    const mockCartService = jasmine.createSpyObj('StoreCartService', ['updateCheckoutRequest']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [
        StoreCheckoutRequestFormComponent,
        MockStoreBillingDetailsFormComponent,
        MockPersonFormComponent,
        MockStoreShippingFormComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: StoreCartService, useValue: mockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    cartServiceSpy = TestBed.inject(StoreCartService) as jasmine.SpyObj<StoreCartService>;
    cartServiceSpy.checkoutRequest$ = of(null);

    fixture = TestBed.createComponent(StoreCheckoutRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid at creation time', () => {
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should not fire a `request` event if the form is invalid', () => {
    observeIfEventFiresUponCallback(
      component.request,
      () => component.onRequest(),
      timer(1)
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeFalse())
    ).subscribe();
  });

  describe('when fed an instance of CheckoutRequest', () => {
    let payload: CheckoutRequest;

    beforeEach(() => {
      payload = {
        billing: {
          typeName: BILLING_TYPE_INDIVIDUAL
        },
        customer: {
          idNumber: 'some-id-number',
          firstName: 'some-first-name',
          lastName: 'some-last-name',
          email: 'some-email',
          phone1: '',
          phone2: ''
        },
        shipping: {
          included: false
        }
      };
      component.billing.setValue(payload.billing);
      component.customer.setValue(payload.customer);
      component.shipping.setValue(payload.shipping);
    });

    it('its form group should become valid', () => {
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should sync this object with the cart service', () => {
      component.onRequest();
      expect(cartServiceSpy.updateCheckoutRequest).toHaveBeenCalled();
    });

    it('should fire a `request` event', () => {
      observeIfEventFiresUponCallback(
        component.request,
        () => component.onRequest(),
        timer(1)
      ).pipe(
        tap(didFireEvent => expect(didFireEvent).toBeTrue())
      ).subscribe();
    });
  });
});

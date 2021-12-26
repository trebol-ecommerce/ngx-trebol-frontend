/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { debounceTime, take, tap } from 'rxjs/operators';
import { PersonFormComponent } from 'src/app/shared/components/person-form/person-form.component';
import { StoreService } from 'src/app/store/store.service';
import { COMMON_VALIDATION_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL } from 'src/text/messages';
import { StoreBillingDetailsFormComponent } from '../billing-details-form/store-billing-details-form.component';
import { StoreShippingFormComponent } from '../shipping-form/store-shipping-form.component';

@Component({
  selector: 'app-store-checkout-request-form',
  templateUrl: './store-checkout-request-form.component.html',
  styleUrls: ['./store-checkout-request-form.component.css'],
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: StoreCheckoutRequestFormComponent
    }
  ]
})
export class StoreCheckoutRequestFormComponent
  implements OnInit, AfterViewInit, OnDestroy, Validator {

  private valueChangesSubscription: Subscription;

  @Output() request = new EventEmitter<void>();

  formGroup: FormGroup;

  get billing() { return this.formGroup.get('billing'); }
  get customer() { return this.formGroup.get('customer'); }
  get shipping() { return this.formGroup.get('shipping'); }

  @ViewChild('billingForm', { static: false }) billingForm: StoreBillingDetailsFormComponent;
  @ViewChild('customerForm', { static: false }) customerForm: PersonFormComponent;
  @ViewChild('shippingForm', { static: false }) shippingForm: StoreShippingFormComponent;

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: MatSnackBar,
    private cartService: StoreService
  ) {
    this.formGroup = this.formBuilder.group({
      billing: [null],
      customer: [null],
      shipping: [null]
    });
  }

  ngOnInit(): void {
    if (this.cartService.checkoutRequestData) {
      this.formGroup.patchValue(this.cartService.checkoutRequestData);
    }
  }

  ngAfterViewInit(): void {
    this.valueChangesSubscription = this.formGroup.valueChanges.pipe(
      debounceTime(300),
      tap(value => { this.cartService.checkoutRequestData = value; })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }

  onClickRequest(): void {
    this.cartService.checkoutButtonPress.emit();
    if (this.formGroup.invalid) {
      this.billingForm.onParentFormTouched();
      this.customerForm.onParentFormTouched();
      this.shippingForm.onParentFormTouched();
      this.snackBarService.open(COMMON_VALIDATION_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
    } else {
      this.request.emit();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { required: value };
    } else {
      const errors = {} as any;
      if (!value.billing) {
        errors.requiredBilling = value.billing;
      }

      if (!value.customer) {
        errors.requiredCustomer = value.customer;
      }

      if (!value.shipping) {
        errors.requiredShipping = value.shipping;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

}

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { debounceTime, take, tap } from 'rxjs/operators';
import { PersonFormComponent } from 'src/app/shared/components/person-form/person-form.component';
import { StoreService } from 'src/app/store/store.service';
import { collectValidationErrors } from 'src/functions/collectionValidationErrors';
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
    this.formGroup.valueChanges.pipe(take(5), tap(v => console.log(v))).subscribe();
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
      this.snackBarService.open('El formulario está incompleto y/o posee campos inválidos. Verifique la información ingresada e inténtelo nuevamente, por favor.', 'OK');
    } else {
      this.request.emit();
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return collectValidationErrors(control);
  }

}

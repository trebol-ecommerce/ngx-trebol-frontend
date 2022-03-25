/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_VALIDATION_ERROR_MESSAGE } from 'src/text/messages';
import { StoreCartService } from '../../store-cart.service';

@Component({
  selector: 'app-store-checkout-request-form',
  templateUrl: './store-checkout-request-form.component.html',
  styleUrls: ['./store-checkout-request-form.component.css']
})
export class StoreCheckoutRequestFormComponent
  implements OnInit, OnDestroy {

  private checkoutRequestUpdateSub: Subscription;

  @Output() request = new EventEmitter<void>();

  formGroup: FormGroup;
  get billing() { return this.formGroup.get('billing') as FormControl; }
  get customer() { return this.formGroup.get('customer') as FormControl; }
  get shipping() { return this.formGroup.get('shipping') as FormControl; }

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: MatSnackBar,
    private cartService: StoreCartService
  ) {
    this.formGroup = this.formBuilder.group({
      billing: null,
      customer: null,
      shipping: null
    });
  }

  ngOnInit(): void {
    if (this.cartService.checkoutRequestData) {
      this.formGroup.patchValue(this.cartService.checkoutRequestData, { onlySelf: true, emitEvent: false });
    }
    this.checkoutRequestUpdateSub = this.formGroup.valueChanges.pipe(
      tap(value => { this.cartService.checkoutRequestData = value; })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.checkoutRequestUpdateSub?.unsubscribe();
  }

  onRequest(): void {
    this.cartService.checkoutButtonPress.emit();
    if (this.formGroup.invalid) {
      this.snackBarService.open(COMMON_VALIDATION_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
    } else {
      this.request.emit();
    }
  }

}

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, take, tap } from 'rxjs/operators';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_VALIDATION_ERROR_MESSAGE } from 'src/text/messages';
import { StoreCartService } from '../../store-cart.service';

@Component({
  selector: 'app-store-checkout-request-form',
  templateUrl: './store-checkout-request-form.component.html',
  styleUrls: ['./store-checkout-request-form.component.css']
})
export class StoreCheckoutRequestFormComponent
  implements OnInit {

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
    this.cartService.checkoutRequest$.pipe(
      take(1),
      filter(checkoutRequestData => !!checkoutRequestData),
      tap(checkoutRequestData => this.formGroup.patchValue(checkoutRequestData, { onlySelf: true, emitEvent: false }))
    ).subscribe();
  }

  onRequest(): void {
    if (this.formGroup.invalid) {
      this.snackBarService.open(COMMON_VALIDATION_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
    } else {
      this.cartService.updateCheckoutRequest(this.formGroup.value);
      this.request.emit();
    }
  }

}

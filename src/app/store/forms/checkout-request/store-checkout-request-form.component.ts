/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  formGroup: UntypedFormGroup;
  get billing() { return this.formGroup.get('billing') as UntypedFormControl; }
  get customer() { return this.formGroup.get('customer') as UntypedFormControl; }
  get shipping() { return this.formGroup.get('shipping') as UntypedFormControl; }

  constructor(
    private formBuilder: UntypedFormBuilder,
    private snackBarService: MatSnackBar,
    private cartService: StoreCartService
  ) {
    this.formGroup = this.formBuilder.group({
      billing: [null, Validators.required],
      customer: [null, Validators.required],
      shipping: [null, Validators.required]
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

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, Subscription, throwError } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { StoreCartService } from '../../store-cart.service';

@Component({
  selector: 'app-store-guest-login-form-dialog',
  templateUrl: './store-guest-login-form-dialog.component.html',
  styleUrls: ['./store-guest-login-form-dialog.component.css']
})
export class StoreGuestLoginFormDialogComponent
  implements OnInit, OnDestroy {

  private actionSubscription: Subscription;
  private submittingSource = new Subject<boolean>();

  submitting$ = this.submittingSource.asObservable();

  formGroup: UntypedFormGroup;
  get person() { return this.formGroup.get('person') as UntypedFormControl; }

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialogRef<StoreGuestLoginFormDialogComponent>,
    private cartService: StoreCartService
  ) { }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      person: new UntypedFormControl(null, Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.actionSubscription?.unsubscribe();
    this.submittingSource.complete();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.submittingSource.next(true);
      this.actionSubscription?.unsubscribe();
      this.actionSubscription = this.authenticationService.guestLogin(this.person.value).pipe(
        takeUntil(this.authenticationService.authCancelation$),
        tap(
          () => {
            const updated = { customer: this.person.value } as CheckoutRequest;
            this.cartService.updateCheckoutRequest(updated);
            this.dialog.close();
          },
          err => {
            this.submittingSource.next(false);
            return throwError(err);
          }
        )
      ).subscribe();
    }
  }

  onCancel(): void {
    this.authenticationService.cancelAuthentication();
    this.dialog.close();
  }

}

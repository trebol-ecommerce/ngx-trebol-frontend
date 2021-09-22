/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { StoreService } from 'src/app/store/store.service';
import { StoreGuestPromptDialogComponent } from '../../dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { StoreGuestPromptDialogOptions } from '../../dialogs/guest-prompt/StoreGuestPromptDialogOptions';
import { StoreGuestShippingFormDialogComponent } from '../../dialogs/guest-shipping-form/store-guest-shipping-form-dialog.component';
import { StoreLoginFormDialogComponent } from '../../dialogs/login-form/store-login-form-dialog.component';
import { StorePaymentRedirectPromptDialogComponent } from '../../dialogs/payment-redirect-prompt/store-payment-redirect-prompt-dialog.component';
import { StoreRegistrationFormDialogComponent } from '../../dialogs/registration-form/store-registration-form-dialog.component';

@Component({
  selector: 'app-store-cart-review',
  templateUrl: './store-cart-review.component.html',
  styleUrls: ['./store-cart-review.component.css']
})
export class StoreCartReviewComponent
  implements OnInit {

  cartNetValue$: Observable<number>;

  tableColumns: string[] = [ 'product', 'price', 'quantity', 'total', 'actions' ];

  constructor(
    private storeService: StoreService,
    private appService: AppService,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {
    this.cartNetValue$ = this.storeService.cartNetValue$.pipe();
  }

  onClickAccept(): void {
    this.requireAuthentication().subscribe(
      verified => {
        if (verified) {
          this.promptPaymentRedirection();
        }
      }
    );
  }

  promptLoginForm(): MatDialogRef<StoreLoginFormDialogComponent> {
    return this.dialogService.open(
      StoreLoginFormDialogComponent,
      {
        width: '24rem',
        disableClose: true
      }
    );
  }

  promptRegistrationForm(): MatDialogRef<StoreRegistrationFormDialogComponent> {
    return this.dialogService.open(
      StoreRegistrationFormDialogComponent,
      {
        width: '40rem',
        disableClose: true
      }
    );
  }

  promptGuestShippingForm(): MatDialogRef<StoreGuestShippingFormDialogComponent> {
    return this.dialogService.open(
      StoreGuestShippingFormDialogComponent,
      {
        width: '40rem',
        disableClose: true
      }
    );
  }

  private followGuestUserChoice(choice: StoreGuestPromptDialogOptions): void {
    switch (choice) {
      case StoreGuestPromptDialogOptions.login:
        this.promptLoginForm(); return;
      case StoreGuestPromptDialogOptions.register:
        this.promptRegistrationForm(); return;
      case StoreGuestPromptDialogOptions.guest:
        this.promptGuestShippingForm(); return;
    }
  }

  /**
   * Displays a dialog to give authentication options for a guest user.
   * Returns an Observable that emits the user's option choice to continue
   * the checkout process, or completes without emitting.
   */
  private promptGuestUserChoices(): Observable<StoreGuestPromptDialogOptions> {
    return this.dialogService.open(
      StoreGuestPromptDialogComponent
    ).afterClosed();
  }

  /**
   * Displays a dialog with a way for the user to access their preferred payment method.
   */
  private promptPaymentRedirection(): void {
    this.dialogService.open(
      StorePaymentRedirectPromptDialogComponent,
      {
        width: '40rem'
      }
    );
  }

  private requireAuthentication(): Observable<boolean> {
    return this.appService.isLoggedIn() ?
      of(true) :
      this.promptGuestUserChoices().pipe(
        switchMap(choice => {
          if (!!choice && choice in StoreGuestPromptDialogOptions) {
            this.followGuestUserChoice(choice);
            return this.appService.isLoggedInChanges$.pipe(
              take(1),
              takeUntil(this.appService.checkoutAuthCancel$)
            );
          } else {
            return EMPTY;
          }
        })
      );
  }
}

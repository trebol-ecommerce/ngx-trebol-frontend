// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, empty, EMPTY } from 'rxjs';
import { concatMap, map, take, tap, mapTo, switchMap, takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { StoreService } from 'src/app/store/store.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StoreLoginFormDialogComponent } from '../../dialogs/login-form/store-login-form-dialog.component';
import { StoreRegistrationFormDialogComponent } from '../../dialogs/registration-form/store-registration-form-dialog.component';
import { StoreGuestShippingFormDialogComponent } from '../../dialogs/guest-shipping-form/store-guest-shipping-form-dialog.component';
import { StoreGuestPromptDialogOptions } from '../../dialogs/guest-prompt/StoreGuestPromptDialogOptions';
import { StoreGuestPromptDialogComponent } from '../../dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { StorePaymentRedirectPromptDialogComponent } from '../../dialogs/payment-redirect-prompt/store-payment-redirect-prompt-dialog.component';

@Component({
  selector: 'app-store-cart-review',
  templateUrl: './store-cart-review.component.html',
  styleUrls: ['./store-cart-review.component.css']
})
export class StoreCartReviewComponent
  implements OnInit {

  public sellDetails$: Observable<SellDetail[]>;
  public cartSubtotalValue$: Observable<number>;
  public cartTotalValue$: Observable<number>;

  public tableColumns: string[] = [ 'product', 'price', 'quantity', 'total', 'actions' ];

  constructor(
    protected storeService: StoreService,
    protected appService: AppService,
    protected router: Router,
    protected dialogService: MatDialog
  ) {
    // TODO refactor this into a routing guard
    this.storeService.cartDetails$.pipe(take(1)).subscribe(
      array => { if (array.length === 0) { this.router.navigateByUrl('/store'); } }
    );
  }

  ngOnInit(): void {
    this.sellDetails$ = this.storeService.cartDetails$.pipe();
    this.cartSubtotalValue$ = this.storeService.cartSubtotalValue$.pipe();

    this.cartTotalValue$ = this.storeService.cartSubtotalValue$.pipe(map(subtotal => Math.ceil(subtotal * 1.19)));
  }

  public onClickIncreaseProductQuantity(index: number): void {
    this.storeService.increaseProductUnits(index);
  }

  public onClickDecreaseProductQuantity(index: number): void {
    this.storeService.decreaseProductUnits(index);
  }

  public onClickRemoveProduct(index: number): void {
    this.storeService.removeProductFromCart(index);
  }

  public promptLoginForm(): MatDialogRef<StoreLoginFormDialogComponent> {
    return this.dialogService.open(
      StoreLoginFormDialogComponent,
      {
        width: '24rem',
        disableClose: true
      }
    );
  }

  public promptRegistrationForm(): MatDialogRef<StoreRegistrationFormDialogComponent> {
    return this.dialogService.open(
      StoreRegistrationFormDialogComponent,
      {
        width: '40rem',
        disableClose: true
      }
    );
  }

  public promptGuestShippingForm(): MatDialogRef<StoreGuestShippingFormDialogComponent> {
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
  protected promptGuestUserChoices(): Observable<StoreGuestPromptDialogOptions> {
    return this.dialogService.open(
      StoreGuestPromptDialogComponent
    ).afterClosed();
  }

  /**
   * Displays a dialog with a way for the user to access their preferred payment method.
   */
  protected promptPaymentRedirection(): void {
    this.dialogService.open(
      StorePaymentRedirectPromptDialogComponent,
      {
        width: '40rem'
      }
    );
  }

  protected requireAuthentication(): Observable<boolean> {
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

  public initiateCheckoutOrRequireAuthentication(): void {
    this.requireAuthentication().subscribe(
      verified => {
        if (verified) {
          this.promptPaymentRedirection();
        }
      }
    );
  }

  public onClickAccept(): void {
    this.initiateCheckoutOrRequireAuthentication();
  }
}

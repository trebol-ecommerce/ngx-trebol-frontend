// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { SellDetail } from 'src/app/data/models/entities/SellDetail';
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

  public sellDetails$: Observable<SellDetail[]>;
  public cartSubtotalValue$: Observable<number>;
  public cartTotalValue$: Observable<number>;

  public tableColumns: string[] = [ 'product', 'price', 'quantity', 'total', 'actions' ];

  constructor(
    protected storeService: StoreService,
    protected appService: AppService,
    protected router: Router,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
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

  protected promptLoginForm(): Observable<void> {
    return this.dialogService.open(
      StoreLoginFormDialogComponent,
      {
        width: '24rem'
      }
    ).afterClosed();
  }

  protected promptRegistrationForm(): Observable<void> {
    return this.dialogService.open(
      StoreRegistrationFormDialogComponent,
      {
        width: '40rem'
      }
    ).afterClosed();
  }

  protected promptGuestShippingForm(): Observable<void> {
    return this.dialogService.open(
      StoreGuestShippingFormDialogComponent,
      {
        width: '40rem'
      }
    ).afterClosed();
  }

  private pickPrompt(choice: StoreGuestPromptDialogOptions): Observable<void> {
    switch (choice) {
      case StoreGuestPromptDialogOptions.login:
        return this.promptLoginForm();
      case StoreGuestPromptDialogOptions.register:
        return this.promptRegistrationForm();
      case StoreGuestPromptDialogOptions.guest:
        return this.promptGuestShippingForm();
    }
  }

  protected promptUserLoginChoices(): Observable<void> {
    return this.dialogService.open(
      StoreGuestPromptDialogComponent
    ).afterClosed().pipe(
      concatMap(
        (choice: number) => {
          if (choice in StoreGuestPromptDialogOptions) {
            return this.pickPrompt(choice);
          } else {
            return empty();
          }
        }
      )
    );
  }

  protected openPaymentRedirectPrompt(): void {
    this.dialogService.open(
      StorePaymentRedirectPromptDialogComponent,
      {
        width: '40rem'
      }
    );
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

  public onClickAccept(): void {
    if (this.appService.isLoggedIn) {
      this.openPaymentRedirectPrompt();
    } else {
      this.promptUserLoginChoices().subscribe(
        () => {
          if (this.appService.isLoggedIn) {
            this.openPaymentRedirectPrompt();
          }
        }
      );
    }
  }
}

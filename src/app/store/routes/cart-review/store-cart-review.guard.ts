/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { StoreGuestPromptDialogComponent } from '../../dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { StoreGuestPromptDialogOptions } from '../../dialogs/guest-prompt/StoreGuestPromptDialogOptions';
import { StoreGuestShippingFormDialogComponent } from '../../dialogs/guest-shipping-form/store-guest-shipping-form-dialog.component';
import { StoreLoginFormDialogComponent } from '../../dialogs/login-form/store-login-form-dialog.component';
import { StoreRegistrationFormDialogComponent } from '../../dialogs/registration-form/store-registration-form-dialog.component';
import { StoreCartService } from '../../store-cart.service';

@Injectable()
export class StoreCartReviewGuard
  implements CanActivate {

  constructor(
    private cartService: StoreCartService,
    private appService: AppService,
    private dialogService: MatDialog,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.cartService.cartDetails$.pipe(
      take(1),
      map(details => (details.length > 0)),
      switchMap(isCartNotEmpty => {
        return isCartNotEmpty ?
                this.requireAuthentication() :
                of(false);
      }),
      tap(v => { if (!v) { this.router.navigateByUrl('/'); } }),
    );
  }

  private requireAuthentication(): Observable<boolean> {
    return this.appService.isLoggedIn() ?
      of(true) :
      this.promptGuestUserChoices().pipe(
        switchMap(choice => {
          if (!choice || !(choice in StoreGuestPromptDialogOptions)) {
            return EMPTY;
          } else {
            this.followGuestUserChoice(choice);
            return this.appService.isLoggedInChanges$.pipe(
              take(1),
              takeUntil(this.appService.checkoutAuthCancel$)
            );
          }
        })
      );
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


  private promptLoginForm(): MatDialogRef<StoreLoginFormDialogComponent> {
    return this.dialogService.open(
      StoreLoginFormDialogComponent,
      {
        width: '24rem'
      }
    );
  }

  private promptRegistrationForm(): MatDialogRef<StoreRegistrationFormDialogComponent> {
    return this.dialogService.open(
      StoreRegistrationFormDialogComponent,
      {
        width: '40rem'
      }
    );
  }

  private promptGuestShippingForm(): MatDialogRef<StoreGuestShippingFormDialogComponent> {
    return this.dialogService.open(
      StoreGuestShippingFormDialogComponent,
      {
        width: '40rem'
      }
    );
  }
}

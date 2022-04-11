/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { merge, Observable, of, Subscription } from 'rxjs';
import { filter, map, skip, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { SessionService } from 'src/app/session.service';
import { StoreGuestLoginFormDialogComponent } from '../../dialogs/guest-login-form/store-guest-login-form-dialog.component';
import { StoreGuestPromptDialogComponent } from '../../dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { StoreGuestPromptDialogOptions } from '../../dialogs/guest-prompt/StoreGuestPromptDialogOptions';
import { StoreLoginFormDialogComponent } from '../../dialogs/login-form/store-login-form-dialog.component';
import { StoreRegistrationFormDialogComponent } from '../../dialogs/registration-form/store-registration-form-dialog.component';
import { StoreCartService } from '../../store-cart.service';

@Injectable()
export class StoreCartReviewGuard
  implements OnDestroy, CanActivate {

  private readonly restrictedUrl = '/store/cart';
  private readonly exitUrl = '/store';
  private restrictingConditionsSub: Subscription;

  constructor(
    private cartService: StoreCartService,
    private appService: SessionService,
    private authenticationService: AuthenticationService,
    private dialogService: MatDialog,
    private router: Router
  ) {
    this.restrictingConditionsSub = this.watchRestrictingConditions().subscribe();
  }

  ngOnDestroy(): void {
    this.restrictingConditionsSub?.unsubscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.cartService.cartDetails$.pipe(
      take(1),
      map(details => (details.length > 0)),
      switchMap(isCartNotEmpty => (isCartNotEmpty ?
        this.requireAuthentication() :
        of(false)
      )),
      tap(isAllowed => {
        if (!isAllowed) {
          this.router.navigateByUrl(this.exitUrl);
        }
      })
    );
  }

  private requireAuthentication(): Observable<boolean> {
    return this.appService.userHasActiveSession$.pipe(
      take(1),
      switchMap(isLoggedIn => (isLoggedIn ?
        of(true) :
        this.promptGuestUserChoices().pipe(
          switchMap((choice: StoreGuestPromptDialogOptions | undefined) => {
            if (!choice) {
              return of(false);
            } else {
              this.followGuestUserChoice(choice);
              return this.appService.userHasActiveSession$.pipe(
                skip(1),
                take(1),
                takeUntil(this.authenticationService.authCancelation$)
              );
            }
          })
        )
      ))
    );
  }

  /**
   * Displays a dialog to give authentication options for a guest user.
   * Returns an Observable that emits the user's option choice to continue
   * the checkout process, or completes without emitting.
   */
  private promptGuestUserChoices() {
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


  private promptLoginForm() {
    return this.dialogService.open(
      StoreLoginFormDialogComponent,
      {
        width: '24rem'
      }
    );
  }

  private promptRegistrationForm() {
    return this.dialogService.open(
      StoreRegistrationFormDialogComponent,
      {
        width: '40rem',
        height: '25rem'
      }
    );
  }

  private promptGuestShippingForm() {
    return this.dialogService.open(
      StoreGuestLoginFormDialogComponent,
      {
        width: '40rem',
        height: '25rem'
      }
    );
  }

  private watchRestrictingConditions() {
    return merge(
      this.cartService.cartDetails$.pipe(
        map(details => (details.length === 0))
      ),
      this.appService.userHasActiveSession$.pipe(
        map(hasActiveSession => !hasActiveSession)
      )
    ).pipe(
      filter(restrictingCondition => restrictingCondition && this.router.routerState?.snapshot?.url === this.restrictedUrl),
      tap(() => this.router.navigateByUrl(this.exitUrl))
    );
  }
}

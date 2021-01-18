import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, EMPTY } from 'rxjs';
import { StoreLoginFormDialogComponent } from './dialogs/login-form/store-login-form-dialog.component';
import { StoreRegistrationFormDialogComponent } from './dialogs/registration-form/store-registration-form-dialog.component';
import { StoreGuestShippingFormDialogComponent } from './dialogs/guest-shipping-form/store-guest-shipping-form-dialog.component';
import { StoreGuestPromptDialogOptions } from './dialogs/guest-prompt/StoreGuestPromptDialogOptions';
import { StoreGuestPromptDialogComponent } from './dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { concatMap } from 'rxjs/operators';
import { StorePaymentRedirectPromptDialogComponent } from './dialogs/payment-redirect-prompt/store-payment-redirect-prompt-dialog.component';
import { AppService } from '../app.service';

@Injectable()
export class StoreCustomerLoginWatchService {

  constructor(
    protected appService: AppService,
    protected dialogService: MatDialog,
  ) {

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

  /**
   * Displays a dialog to authenticate and authorize the user,
   * and returns an observable that will do one of two things:
   * "follow up to a succesful authentication", then emit a void and complete, or
   * "be cancelled/fail to authenticate" and complete without emitting.
   */
  protected promptUserLoginChoices(): Observable<void> {
    return this.dialogService.open(
      StoreGuestPromptDialogComponent
    ).afterClosed().pipe(
      concatMap(
        (choice: number) => {
          if (choice && choice in StoreGuestPromptDialogOptions) {
            return this.pickPrompt(choice);
          } else {
            return EMPTY;
          }
        }
      )
    );
  }

  /**
   * Displays a dialog and makes way for the user to access their preferred payment method.
   *
   * This method should only be called after acknowledging the user is logged in.
   */
  protected promptPaymentRedirection(): void {
    this.dialogService.open(
      StorePaymentRedirectPromptDialogComponent,
      {
        width: '40rem'
      }
    );
  }

  public initiateCheckoutOrRequireAuthentication(): void {
    if (this.appService.isLoggedIn()) {
      this.promptPaymentRedirection();
    } else {
      this.promptUserLoginChoices().subscribe(
        () => {
          if (this.appService.isLoggedIn()) {
            this.promptPaymentRedirection();
          }
        }
      );
    }
  }
}

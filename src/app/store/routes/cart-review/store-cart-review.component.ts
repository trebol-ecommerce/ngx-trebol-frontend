import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { StoreService } from 'src/app/store/store.service';
import { SellDetail } from 'src/app/data/models/entities/SellDetail';
import { Session } from 'src/app/data/models/entities/Session';
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
  public sellSubtotalValue$: Observable<number>;
  public sellTotalValue$: Observable<number>;

  public tableColumns: string[] = [ 'product', 'price', 'quantity', 'total', 'actions' ];

  constructor(
    protected storeService: StoreService,
    protected appService: AppService,
    protected router: Router,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    this.storeService.sellDetails$.pipe(take(1)).subscribe(
      array => { if (array.length === 0) { this.router.navigateByUrl('/store'); } }
    );
  }

  ngOnInit(): void {
    this.sellDetails$ = this.storeService.sellDetails$.pipe();
    this.sellSubtotalValue$ = this.storeService.sellSubtotalValue$.pipe();

    this.sellTotalValue$ = this.storeService.sellSubtotalValue$.pipe(map(subtotal => Math.ceil(subtotal * 1.19)));
  }

  protected promptLoginForm(): Observable<void> {
    return this.dialogService.open(
      StoreLoginFormDialogComponent,
      { width: '24rem' }
    ).afterClosed();
  }

  protected promptRegistrationForm(): Observable<void> {
    return this.dialogService.open(
      StoreRegistrationFormDialogComponent,
      { width: '40rem' }
    ).afterClosed();
  }

  protected promptGuestShippingForm(): Observable<void> {
    return this.dialogService.open(
      StoreGuestShippingFormDialogComponent,
      { width: '40rem' }
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

  protected promptGuestUser(): Observable<void> {
    return this.dialogService.open(
      StoreGuestPromptDialogComponent
    ).afterClosed().pipe(
      concatMap(
        (choice: number) => {
          if (choice in StoreGuestPromptDialogOptions) {
            return this.pickPrompt(choice);
          } else {
            return of(null);
          }
        }
      )
    );
  }

  protected getSessionOrRequestSession(): Observable<Session> {
    const session = this.appService.getCurrentSession();
    if (session && session.user?.clientId) {
      return of(session);
    } else {
      return this.promptGuestUser().pipe(
        map(() => this.appService.getCurrentSession())
      );
    }
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
    this.getSessionOrRequestSession().subscribe(
      (ssn: Session) => {
        if (ssn) {
          this.dialogService.open(
            StorePaymentRedirectPromptDialogComponent,
            { width: '40rem' }
          );
        }
      }
    );
  }
}

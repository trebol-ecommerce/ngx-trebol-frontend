import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { StoreService } from 'src/app/store/store.service';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { Session } from 'src/data/models/entities/Session';
import { StoreGuestPromptDialogComponent } from '../../guest-prompt-dialog/store-guest-prompt-dialog.component';
import { StoreGuestPromptDialogOptions } from '../../guest-prompt-dialog/StoreGuestPromptDialogOptions';
import { StoreGuestShippingFormDialogComponent } from '../../guest-shipping-form-dialog/store-guest-shipping-form-dialog.component';
import { StoreLoginFormDialogComponent } from '../../login-form-dialog/store-login-form-dialog.component';
import { StoreRegistrationFormDialogComponent } from '../../registration-form-dialog/store-registration-form-dialog.component';
import { StorePaymentRedirectPromptDialogComponent } from '../../payment-redirect-prompt-dialog/store-payment-redirect-prompt-dialog.component';

@Component({
  selector: 'app-store-cart',
  templateUrl: './store-cart.component.html',
  styleUrls: ['./store-cart.component.css']
})
export class StoreCartComponent
  implements OnInit {

  public sellDetails$: Observable<SellDetail[]>;
  public sellSubtotalValue$: Observable<number>;
  public sellTotalValue$: Observable<number>;

  public tableColumns: string[] = [ 'product', 'price', 'quantity', 'total', 'actions' ];

  constructor(
    protected service: StoreService,
    protected appUserService: AppUserService,
    protected router: Router,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    this.service.sellDetails$.pipe(take(1)).subscribe(
      array => { if (array.length === 0) { this.router.navigateByUrl('/store'); } }
    );
  }

  ngOnInit(): void {
    this.sellDetails$ = this.service.sellDetails$.pipe();
    this.sellSubtotalValue$ = this.service.sellSubtotalValue$.pipe();

    this.sellTotalValue$ = this.service.sellSubtotalValue$.pipe(map(subtotal => Math.ceil(subtotal * 1.19)));
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

  private pickPrompt(choice: number): Observable<void> {
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
    const session = this.appUserService.getCurrentSession();
    if (session && session.user?.clientId) {
      return of(session);
    } else {
      return this.promptGuestUser().pipe(
        map(() => this.appUserService.getCurrentSession())
      );
    }
  }

  public onClickIncreaseProductQuantity(index: number): void {
    this.service.increaseProductUnits(index);
  }

  public onClickDecreaseProductQuantity(index: number): void {
    this.service.decreaseProductUnits(index);
  }

  public onClickRemoveProduct(index: number): void {
    this.service.removeProduct(index);
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

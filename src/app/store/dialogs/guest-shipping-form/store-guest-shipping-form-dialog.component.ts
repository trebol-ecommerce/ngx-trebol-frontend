/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { StoreCartService } from '../../store-cart.service';

@Component({
  selector: 'app-store-guest-shipping-form-dialog',
  templateUrl: './store-guest-shipping-form-dialog.component.html',
  styleUrls: ['./store-guest-shipping-form-dialog.component.css']
})
export class StoreGuestShippingFormDialogComponent
  implements OnDestroy {

  private savingSource = new Subject<boolean>();

  saving$ = this.savingSource.asObservable();

  formGroup: FormGroup;

  get person() { return this.formGroup.get('person') as FormControl; }

  constructor(
    private appService: AppService,
    private dialog: MatDialogRef<StoreGuestShippingFormDialogComponent>,
    private entityFormGroupService: EntityFormGroupFactoryService,
    private cartService: StoreCartService
  ) {
    this.formGroup = new FormGroup({
      person: this.entityFormGroupService.createFormGroupFor('person')
    });
  }

  ngOnDestroy(): void {
    this.savingSource.complete();
  }

  onSubmit(): void {
    this.savingSource.next(true);
    this.appService.guestLogin(this.person.value).pipe(
      tap(() => {
        this.cartService.checkoutRequestData.customer = this.person.value;
        this.dialog.close();
      }),
      catchError(err => {
        this.savingSource.next(false);
        return throwError(err);
      })
    ).subscribe();
  }

  onCancel(): void {
    this.appService.cancelAuthentication();
    this.dialog.close();
  }

}

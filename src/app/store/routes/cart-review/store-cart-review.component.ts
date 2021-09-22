/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/store/store.service';
import { StorePaymentRedirectPromptDialogComponent } from '../../dialogs/payment-redirect-prompt/store-payment-redirect-prompt-dialog.component';

@Component({
  selector: 'app-store-cart-review',
  templateUrl: './store-cart-review.component.html',
  styleUrls: ['./store-cart-review.component.css']
})
export class StoreCartReviewComponent
  implements OnInit {

  cartNetValue$: Observable<number>;

  constructor(
    private storeService: StoreService,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {
    this.cartNetValue$ = this.storeService.cartNetValue$.pipe();
  }

  onClickAccept(): void {
    this.dialogService.open(
      StorePaymentRedirectPromptDialogComponent,
      {
        width: '40rem'
      }
    );
  }
}

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreCartReviewComponent } from './routes/cart-review/store-cart-review.component';
import { StoreCartReviewGuard } from './routes/cart-review/store-cart-review.guard';
import { StoreCatalogComponent } from './routes/catalog/store-catalog.component';
import { StoreReceiptComponent } from './routes/receipt/store-receipt.component';
import { StoreComponent } from './store.component';

const storeRoutes: Routes = [
  {
    path: 'store', component: StoreComponent,
    children: [
      {
        path: 'catalog',
        component: StoreCatalogComponent
      },
      {
        path: 'cart',
        component: StoreCartReviewComponent,
        canActivate: [StoreCartReviewGuard]
      },
      {
        path: 'receipt',
        component: StoreReceiptComponent
      },
      {
        path: '**',
        pathMatch: 'prefix',
        redirectTo: 'catalog'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(storeRoutes)
  ],
  exports: [RouterModule]
})
export class StoreRoutingModule { }

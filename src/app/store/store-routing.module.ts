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
import { StoreSearchComponent } from './routes/search/store-search.component';
import { StoreComponent } from './store.component';

export const STORE_CHILD_ROUTES: Routes = [
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
    path: 'search',
    component: StoreSearchComponent
  },
  {
    path: 'receipt',
    component: StoreReceiptComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: StoreComponent,
        children: [
          ...STORE_CHILD_ROUTES,
          {
            path: '**', pathMatch: 'prefix', redirectTo: 'catalog'
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class StoreRoutingModule { }

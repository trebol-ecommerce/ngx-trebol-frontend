/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const ROOT_ROUTES: Routes = [
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
    data: { preload: false }
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management.module').then(m => m.ManagementModule),
    data: { preload: false }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        ...ROOT_ROUTES,
        {
          path: '', pathMatch: 'full', redirectTo: '/store/catalog'
        }
      ],
      { preloadingStrategy: SelectivePreloadingStrategyService }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

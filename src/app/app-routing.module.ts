// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'store',
          loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
          data: { preload: true }
        },
        {
          path: 'management',
          loadChildren: () => import('./management/management.module').then(m => m.ManagementModule),
          data: { preload: false }
        },
        {
          path: '', pathMatch: 'full', redirectTo: '/store/catalog'
        }
      ]
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

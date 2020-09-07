import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'store' }
      ]
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

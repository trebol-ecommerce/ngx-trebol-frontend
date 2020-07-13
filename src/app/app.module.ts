import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LocalMemoryDataModule } from 'src/data/services/local-memory/local-memory-data.module';
import { AppComponent } from './app.component';
import { ManagementModule } from './management/management.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';

const DEBUG_ROUTES = false;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    // HttpClientModule,
    LocalMemoryDataModule,
    StoreModule,
    ManagementModule,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  constructor(router: Router) {
    if (DEBUG_ROUTES) {
      this.inspectRouterConfiguration(router);
    }
  }

  // Diagnostic only
  protected inspectRouterConfiguration(router: Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key: any, value: any) => (typeof value === 'function') ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

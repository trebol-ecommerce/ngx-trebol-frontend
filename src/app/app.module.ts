/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { environmentModules } from 'src/environments/environment-modules';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

const DEBUG_ROUTES = false;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // SharedModule,
    AppRoutingModule,
    environmentModules
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

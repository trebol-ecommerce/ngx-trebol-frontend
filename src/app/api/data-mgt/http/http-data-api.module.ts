// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { ClientsHttpDataApiService } from './entity-impl/clients.http-data-api.service';
import { SellersHttpDataApiService } from './entity-impl/sellers.http-data-api.service';
import { PeopleHttpDataApiService } from './entity-impl/people.http-data-api.service';
import { ProductsHttpDataApiService } from './entity-impl/products.http-data-api.service';
import { SalesHttpDataApiService } from './entity-impl/sales.http-data-api.service';
import { SharedHttpDataApiService } from './shared.http-data-api.service';
import { UsersHttpDataApiService } from './entity-impl/users.http-data-api.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * Provides services that read and write data using an external HTTP server (defined in the environment files)
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.clientsCrud, useClass: ClientsHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.sellersCrud, useClass: SellersHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.people, useClass: PeopleHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesHttpDataApiService }
  ]
})
export class HttpDataApiModule { }

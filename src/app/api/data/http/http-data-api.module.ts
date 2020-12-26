// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { CustomersHttpDataApiService } from './impl/customers.http-data-api.service';
import { SellersHttpDataApiService } from './impl/sellers.http-data-api.service';
import { ProductsHttpDataApiService } from './impl/products.http-data-api.service';
import { SalesHttpDataApiService } from './impl/sales.http-data-api.service';
import { SharedHttpDataApiService } from './impl/shared.http-data-api.service';
import { UsersHttpDataApiService } from './impl/users.http-data-api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpDataAccessApiService } from './http-data-access-api.service';

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
    { provide: API_SERVICE_INJECTION_TOKENS.customersCrud, useClass: CustomersHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salespeopleCrud, useClass: SellersHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.dataAccess, useClass: HttpDataAccessApiService }
  ]
})
export class HttpDataApiModule { }

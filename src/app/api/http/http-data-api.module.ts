// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { CustomersHttpDataApiService } from './data/customers.http-data-api.service';
import { SalespeopleHttpDataApiService } from './data/salespeople.http-data-api.service';
import { ProductsHttpDataApiService } from './data/products.http-data-api.service';
import { SalesHttpDataApiService } from './data/sales.http-data-api.service';
import { SharedHttpDataApiService } from './data/shared.http-data-api.service';
import { UsersHttpDataApiService } from './data/users.http-data-api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpDataAccessApiService } from './access/http-data-access-api.service';
import { ImagesHttpDataApiService } from './data/images.http-data-api.service';

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
    { provide: API_SERVICE_INJECTION_TOKENS.imagesCrud, useClass: ImagesHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salespeopleCrud, useClass: SalespeopleHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesHttpDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.dataAccess, useClass: HttpDataAccessApiService }
  ]
})
export class HttpDataApiModule { }

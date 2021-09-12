// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { CustomersDataHttpApiService } from './data/customers-data.http-api.service';
import { SalespeopleDataHttpApiService } from './data/salespeople-data.http-api.service';
import { ProductsDataHttpApiService } from './data/products-data.http-api.service';
import { SalesDataHttpApiService } from './data/sales-data.http-api.service';
import { SharedDataHttpApiService } from './data/shared-data.http-api.service';
import { UsersDataHttpApiService } from './data/users-data.http-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccessHttpApiService } from './access/access.http-api.service';
import { ImagesDataHttpApiService } from './data/images-data.http-api.service';
import { StoreHttpApiService } from './store/store.http-api.service';
import { SessionHttpApiService } from './session/session.http-api.service';
import { SessionHttpApiInterceptor } from './session/session.http-api.interceptor';

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
    { provide: API_SERVICE_INJECTION_TOKENS.customersCrud, useClass: CustomersDataHttpApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.imagesCrud, useClass: ImagesDataHttpApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salespeopleCrud, useClass: SalespeopleDataHttpApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsDataHttpApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedDataHttpApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersDataHttpApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesDataHttpApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.dataAccess, useClass: AccessHttpApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.store, useClass: StoreHttpApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.auth, useClass: SessionHttpApiService },
    { provide: HTTP_INTERCEPTORS, useClass: SessionHttpApiInterceptor, multi: true }
  ]
})
export class HttpApiModule { }
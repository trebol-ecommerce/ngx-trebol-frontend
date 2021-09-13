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
import { AboutPublicHttpApiService } from './public/about-public.http-api.service';
import { SessionHttpApiService } from './session/session.http-api.service';
import { SessionHttpApiInterceptor } from './session/session.http-api.interceptor';
import { CategoriesPublicHttpApiService } from './public/categories-public.http-api.service';
import { CheckoutPublicHttpApiService } from './public/checkout-public.http-api.service ';
import { ProductsPublicHttpApiService } from './public/products-public.http-api.service';
import { ReceiptPublicHttpApiService } from './public/receipt-public.http-api.service';

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
    {
      provide: API_SERVICE_INJECTION_TOKENS.access,
      useClass: AccessHttpApiService
    },
    // {
    //   provide: API_SERVICE_INJECTION_TOKENS.dataBillingTypes,
    //   useClass:
    // },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataCustomers,
      useClass: CustomersDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataImages,
      useClass: ImagesDataHttpApiService
    },
    // {
    //   provide: API_SERVICE_INJECTION_TOKENS.dataPeople,
    //   useClass:
    // },
    // {
    //   provide: API_SERVICE_INJECTION_TOKENS.dataProductCategories,
    //   useClass:
    // },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataProducts,
      useClass: ProductsDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataShared,
      useClass: SharedDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataSales,
      useClass: SalesDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataSalespeople,
      useClass: SalespeopleDataHttpApiService
    },
    // {
    //   provide: API_SERVICE_INJECTION_TOKENS.dataUserRoles,
    //   useClass:
    // },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataUsers,
      useClass: UsersDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.about,
      useClass: AboutPublicHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.categories,
      useClass: CategoriesPublicHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.checkout,
      useClass: CheckoutPublicHttpApiService
    },
    // {
    //   provide: API_SERVICE_INJECTION_TOKENS.guest,
    //   useClass:
    // },
    {
      provide: API_SERVICE_INJECTION_TOKENS.login,
      useClass: SessionHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.products,
      useClass: ProductsPublicHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.receipt,
      useClass: ReceiptPublicHttpApiService
    },
    // {
    //   provide: API_SERVICE_INJECTION_TOKENS.register,
    //   useClass: CustomersDataHttpApiService
    // },
    { provide: HTTP_INTERCEPTORS, useClass: SessionHttpApiInterceptor, multi: true }
  ]
})
export class HttpApiModule { }

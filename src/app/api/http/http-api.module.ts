/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { AccessHttpApiService } from './services/access.http-api.service';
import { ProfileAccountHttpApiService } from './services/profile-account.http-api.service';
import { BillingTypesDataHttpApiService } from './services/billing-types-data.http-api.service';
import { CustomersDataHttpApiService } from './services/customers-data.http-api.service';
import { ImagesDataHttpApiService } from './services/images-data.http-api.service';
import { PeopleDataHttpApiService } from './services/people-data.http-api.service';
import { ProductCategoriesDataHttpApiService } from './services/product-categories-data.http-api.service';
import { ProductListsDataHttpApiService } from './services/product-lists-data.http-api.service';
import { ProductsDataHttpApiService } from './services/products-data.http-api.service';
import { SalesDataHttpApiService } from './services/sales-data.http-api.service';
import { SalespeopleDataHttpApiService } from './services/salespeople-data.http-api.service';
import { ShippersDataHttpApiService } from './services/shippers-data.http-api.service';
import { UserRolesDataHttpApiService } from './services/user-roles-data.http-api.service';
import { UsersDataHttpApiService } from './services/users-data.http-api.service';
import { AboutPublicHttpApiService } from './services/about-public.http-api.service';
import { CheckoutPublicHttpApiService } from './services/checkout-public.http-api.service ';
import { GuestPublicHttpApiService } from './services/guest-public.http-api.service';
import { LoginPublicHttpApiService } from './services/login-public.http-api.service';
import { ReceiptPublicHttpApiService } from './services/receipt-public.http-api.service';
import { RegisterPublicHttpApiService } from './services/register-public.http-api.service';
import { SessionHttpApiInterceptor } from './interceptors/session.http-api.interceptor';

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
      provide: API_INJECTION_TOKENS.access,
      useClass: AccessHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.accountProfile,
      useClass: ProfileAccountHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataBillingTypes,
      useClass: BillingTypesDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataCustomers,
      useClass: CustomersDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataImages,
      useClass: ImagesDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataPeople,
      useClass: PeopleDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataProductCategories,
      useClass: ProductCategoriesDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataProductLists,
      useClass: ProductListsDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataProducts,
      useClass: ProductsDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataSales,
      useClass: SalesDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataSalespeople,
      useClass: SalespeopleDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataShippers,
      useClass: ShippersDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataUserRoles,
      useClass: UserRolesDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataUsers,
      useClass: UsersDataHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.about,
      useClass: AboutPublicHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.checkout,
      useClass: CheckoutPublicHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.guest,
      useClass: GuestPublicHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.login,
      useClass: LoginPublicHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.receipt,
      useClass: ReceiptPublicHttpApiService
    },
    {
      provide: API_INJECTION_TOKENS.register,
      useClass: RegisterPublicHttpApiService
    },
    { provide: HTTP_INTERCEPTORS, useClass: SessionHttpApiInterceptor, multi: true }
  ]
})
export class HttpApiModule { }

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { AccessHttpApiService } from './access/access.http-api.service';
import { ProfileAccountHttpApiService } from './account/profile-account.http-api.service';
import { BillingTypesDataHttpApiService } from './data/billing-types-data.http-api.service';
import { CustomersDataHttpApiService } from './data/customers-data.http-api.service';
import { ImagesDataHttpApiService } from './data/images-data.http-api.service';
import { PeopleDataHttpApiService } from './data/people-data.http-api.service';
import { ProductCategoriesDataHttpApiService } from './data/product-categories-data.http-api.service';
import { ProductListsDataHttpApiService } from './data/product-lists-data.http-api.service';
import { ProductsDataHttpApiService } from './data/products-data.http-api.service';
import { SalesDataHttpApiService } from './data/sales-data.http-api.service';
import { SalespeopleDataHttpApiService } from './data/salespeople-data.http-api.service';
import { ShippersDataHttpApiService } from './data/shippers-data.http-api.service';
import { UserRolesDataHttpApiService } from './data/user-roles-data.http-api.service';
import { UsersDataHttpApiService } from './data/users-data.http-api.service';
import { AboutPublicHttpApiService } from './public/about-public.http-api.service';
import { CategoriesPublicHttpApiService } from './public/categories-public.http-api.service';
import { CheckoutPublicHttpApiService } from './public/checkout-public.http-api.service ';
import { GuestPublicHttpApiService } from './public/guest-public.http-api.service';
import { LoginPublicHttpApiService } from './public/login-public.http-api.service';
import { ProductsPublicHttpApiService } from './public/products-public.http-api.service';
import { ReceiptPublicHttpApiService } from './public/receipt-public.http-api.service';
import { RegisterPublicHttpApiService } from './public/register-public.http-api.service';
import { SessionHttpApiInterceptor } from './session.http-api.interceptor';

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
    {
      provide: API_SERVICE_INJECTION_TOKENS.accountProfile,
      useClass: ProfileAccountHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataBillingTypes,
      useClass: BillingTypesDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataCustomers,
      useClass: CustomersDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataImages,
      useClass: ImagesDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataPeople,
      useClass: PeopleDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataProductCategories,
      useClass: ProductCategoriesDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataProductLists,
      useClass: ProductListsDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataProducts,
      useClass: ProductsDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataSales,
      useClass: SalesDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataSalespeople,
      useClass: SalespeopleDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataShippers,
      useClass: ShippersDataHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataUserRoles,
      useClass: UserRolesDataHttpApiService
    },
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
    {
      provide: API_SERVICE_INJECTION_TOKENS.guest,
      useClass: GuestPublicHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.login,
      useClass: LoginPublicHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.products,
      useClass: ProductsPublicHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.receipt,
      useClass: ReceiptPublicHttpApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.register,
      useClass: RegisterPublicHttpApiService
    },
    { provide: HTTP_INTERCEPTORS, useClass: SessionHttpApiInterceptor, multi: true }
  ]
})
export class HttpApiModule { }

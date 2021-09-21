/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { CustomersDataLocalMemoryApiService } from './data/customers-data.local-memory-api.service';
import { SalespeopleDataLocalMemoryApiService } from './data/salespeople-data.local-memory-api.service';
import { ProductsDataLocalMemoryApiService } from './data/products-data.local-memory-api.service';
import { SalesDataLocalMemoryApiService } from './data/sales-data.local-memory-api.service';
import { ProductCategoriesDataLocalMemoryApiService } from './data/product-categories-data.local-memory-api.service';
import { UsersDataLocalMemoryApiService } from './data/users-data.local-memory-api.service';
import { AccessLocalMemoryApiService } from './access/access.local-memory-api.service';
import { ImagesDataLocalMemoryApiService } from './data/images-data.local-memory-api.service';
import { LoginPublicLocalMemoryApiService } from './public/login-public.local-memory-api.service';
import { AboutPublicLocalMemoryApiService } from './public/about-public.local-memory-api.service';
import { CategoriesPublicLocalMemoryApiService } from './public/categories-public.local-memory-api.service';
import { CheckoutPublicLocalMemoryApiService } from './public/checkout-public.local-memory-api.service';
import { ReceiptPublicLocalMemoryApiService } from './public/receipt-public.local-memory-api.service';
import { GuestPublicLocalMemoryApiService } from './public/guest-public.local-memory-api.service';
import { ProfileAccountLocalMemoryApiService } from './account/profile-account.local-memory-api.service';
import { RegisterPublicLocalMemoryApiService } from './public/register-public.local-memory-api.service';
import { ProductsPublicLocalMemoryApiService } from './public/products-public.local-memory-api.service';
import { BillingTypesDataLocalMemoryApiService } from './data/billing-types-data.local-memory-api.service';
import { PeopleDataLocalMemoryApiService } from './data/people-data.local-memory-api.service';
import { UserRolesDataLocalMemoryApiService } from './data/user-roles-data.local-memory-api.service';

/**
 * Provides services that read and write data using the client's working memory
 */
@NgModule({
  providers: [
    {
      provide: API_SERVICE_INJECTION_TOKENS.access,
      useClass: AccessLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.accountProfile,
      useClass: ProfileAccountLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataBillingTypes,
      useClass: BillingTypesDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataCustomers,
      useClass: CustomersDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataImages,
      useClass: ImagesDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataPeople,
      useClass: PeopleDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataProductCategories,
      useClass: ProductCategoriesDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataProducts,
      useClass: ProductsDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataSales,
      useClass: SalesDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataSalespeople,
      useClass: SalespeopleDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataUserRoles,
      useClass: UserRolesDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataUsers,
      useClass: UsersDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.about,
      useClass: AboutPublicLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.categories,
      useClass: CategoriesPublicLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.checkout,
      useClass: CheckoutPublicLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.guest,
      useClass: GuestPublicLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.login,
      useClass: LoginPublicLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.products,
      useClass: ProductsPublicLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.receipt,
      useClass: ReceiptPublicLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.register,
      useClass: RegisterPublicLocalMemoryApiService
    }
  ]
})
export class LocalMemoryApiModule { }

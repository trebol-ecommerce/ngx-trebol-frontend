/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { AccessLocalMemoryApiService } from './services/access.local-memory-api.service';
import { ProfileAccountLocalMemoryApiService } from './services/profile-account.local-memory-api.service';
import { BillingTypesDataLocalMemoryApiService } from './services/billing-types-data.local-memory-api.service';
import { CustomersDataLocalMemoryApiService } from './services/customers-data.local-memory-api.service';
import { ImagesDataLocalMemoryApiService } from './services/images-data.local-memory-api.service';
import { PeopleDataLocalMemoryApiService } from './services/people-data.local-memory-api.service';
import { ProductCategoriesDataLocalMemoryApiService } from './services/product-categories-data.local-memory-api.service';
import { ProductListsDataLocalMemoryApiService } from './services/product-lists-data.local-memory-api.service';
import { ProductsDataLocalMemoryApiService } from './services/products-data.local-memory-api.service';
import { OrdersDataLocalMemoryApiService } from './services/orders-data.local-memory-api.service';
import { SalespeopleDataLocalMemoryApiService } from './services/salespeople-data.local-memory-api.service';
import { ShippersDataLocalMemoryApiService } from './services/shippers-data.local-memory-api.service';
import { UserRolesDataLocalMemoryApiService } from './services/user-roles-data.local-memory-api.service';
import { UsersDataLocalMemoryApiService } from './services/users-data.local-memory-api.service';
import { AboutPublicLocalMemoryApiService } from './services/about-public.local-memory-api.service';
import { CheckoutPublicLocalMemoryApiService } from './services/checkout-public.local-memory-api.service';
import { GuestPublicLocalMemoryApiService } from './services/guest-public.local-memory-api.service';
import { LoginPublicLocalMemoryApiService } from './services/login-public.local-memory-api.service';
import { ReceiptPublicLocalMemoryApiService } from './services/receipt-public.local-memory-api.service';
import { RegisterPublicLocalMemoryApiService } from './services/register-public.local-memory-api.service';

/**
 * Provides services that read and write data using the client's working memory
 */
@NgModule({
  providers: [
    {
      provide: API_INJECTION_TOKENS.access,
      useClass: AccessLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.accountProfile,
      useClass: ProfileAccountLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataBillingTypes,
      useClass: BillingTypesDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataCustomers,
      useClass: CustomersDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataImages,
      useClass: ImagesDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataPeople,
      useClass: PeopleDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataProductCategories,
      useClass: ProductCategoriesDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataProductLists,
      useClass: ProductListsDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataProducts,
      useClass: ProductsDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataOrders,
      useClass: OrdersDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataSalespeople,
      useClass: SalespeopleDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataShippers,
      useClass: ShippersDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataUserRoles,
      useClass: UserRolesDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.dataUsers,
      useClass: UsersDataLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.about,
      useClass: AboutPublicLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.checkout,
      useClass: CheckoutPublicLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.guest,
      useClass: GuestPublicLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.login,
      useClass: LoginPublicLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.receipt,
      useClass: ReceiptPublicLocalMemoryApiService
    },
    {
      provide: API_INJECTION_TOKENS.register,
      useClass: RegisterPublicLocalMemoryApiService
    }
  ]
})
export class LocalMemoryApiModule { }

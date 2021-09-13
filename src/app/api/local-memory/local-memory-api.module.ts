// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { CustomersDataLocalMemoryApiService } from './data/customers-data.local-memory-api.service';
import { SalespeopleDataLocalMemoryApiService } from './data/salespeople-data.local-memory-api.service';
import { ProductsDataLocalMemoryApiService } from './data/products-data.local-memory-api.service';
import { SalesDataLocalMemoryApiService } from './data/sales-data.local-memory-api.service';
import { SharedDataLocalMemoryApiService } from './data/shared-data.local-memory-api.service';
import { UsersDataLocalMemoryApiService } from './data/users-data.local-memory-api.service';
import { AccessLocalMemoryApiService } from './access/access.local-memory-api.service';
import { ImagesDataLocalMemoryApiService } from './data/images-data.local-memory-api.service';
import { LoginPublicLocalMemoryApiService } from './store/login-public.local-memory-api.service';
import { AboutPublicLocalMemoryApiService } from './store/about-public.local-memory-api.service';
import { CategoriesPublicLocalMemoryApiService } from './store/categories-public.local-memory-api.service';
import { CheckoutPublicLocalMemoryApiService } from './store/checkout-public.local-memory-api.service';
import { ReceiptPublicLocalMemoryApiService } from './store/receipt-public.local-memory-api.service';
import { GuestPublicLocalMemoryApiService } from './store/guest-public.local-memory-api.service';
import { ProfileAccountLocalMemoryApiService } from './account/profile-account.local-memory-api.service';
import { RegisterPublicLocalMemoryApiService } from './store/register-public.local-memory-api.service';
import { ProductsPublicLocalMemoryApiService } from './store/products-public.local-memory-api.service';

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
    // {
    //   provide: API_SERVICE_INJECTION_TOKENS.dataBillingTypes,
    //   useClass:
    // },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataCustomers,
      useClass: CustomersDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataImages,
      useClass: ImagesDataLocalMemoryApiService
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
      useClass: ProductsDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataShared,
      useClass: SharedDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataSales,
      useClass: SalesDataLocalMemoryApiService
    },
    {
      provide: API_SERVICE_INJECTION_TOKENS.dataSalespeople,
      useClass: SalespeopleDataLocalMemoryApiService
    },
    // {
    //   provide: API_SERVICE_INJECTION_TOKENS.dataUserRoles,
    //   useClass:
    // },
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

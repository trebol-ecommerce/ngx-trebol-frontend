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
import { SessionLocalMemoryApiService } from './session/session.local-memory-api.service';
import { StoreLocalMemoryApiService } from './store/store.local-memory-api.service';

/**
 * Provides services that read and write data using the client's working memory
 */
@NgModule({
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.customersCrud, useClass: CustomersDataLocalMemoryApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.imagesCrud, useClass: ImagesDataLocalMemoryApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salespeopleCrud, useClass: SalespeopleDataLocalMemoryApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsDataLocalMemoryApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedDataLocalMemoryApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersDataLocalMemoryApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesDataLocalMemoryApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.dataAccess, useClass: AccessLocalMemoryApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.auth, useClass: SessionLocalMemoryApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.store, useClass: StoreLocalMemoryApiService }
  ]
})
export class LocalMemoryApiModule { }

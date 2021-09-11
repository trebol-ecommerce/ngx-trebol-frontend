// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { CustomersLocalMemoryDataApiService } from './data/customers.local-memory-data-api.service';
import { SalespeopleLocalMemoryDataApiService } from './data/salespeople.local-memory-data-api.service';
import { ProductsLocalMemoryDataApiService } from './data/products.local-memory-data-api.service';
import { SalesLocalMemoryDataApiService } from './data/sales.local-memory-data-api.service';
import { SharedLocalMemoryDataService } from './data/shared.local-memory-data-api.service';
import { UsersLocalMemoryDataApiService } from './data/users.local-memory-data-api.service';
import { LocalMemoryDataAccessApiService } from './access/local-memory-data-access-api.service';
import { ImagesLocalMemoryDataApiService } from './data/images.local-memory-data-api.service';

/**
 * Provides services that read and write data using the client's working memory
 */
@NgModule({
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.customersCrud, useClass: CustomersLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.imagesCrud, useClass: ImagesLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salespeopleCrud, useClass: SalespeopleLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedLocalMemoryDataService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.dataAccess, useClass: LocalMemoryDataAccessApiService }
  ]
})
export class LocalMemoryDataModule { }

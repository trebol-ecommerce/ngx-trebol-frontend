// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { CustomersLocalMemoryDataApiService } from './impl/customers.local-memory-data-api.service';
import { SellersLocalMemoryDataApiService } from './impl/sellers.local-memory-data-api.service';
import { ProductsLocalMemoryDataApiService } from './impl/products.local-memory-data-api.service';
import { SalesLocalMemoryDataApiService } from './impl/sales.local-memory-data-api.service';
import { SharedLocalMemoryDataService } from './impl/shared.local-memory-data-api.service';
import { UsersLocalMemoryDataApiService } from './impl/users.local-memory-data-api.service';
import { LocalMemoryDataAccessApiService } from './local-memory-data-access-api.service';

/**
 * Provides services that read and write data using the client's working memory
 */
@NgModule({
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.customersCrud, useClass: CustomersLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.sellersCrud, useClass: SellersLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedLocalMemoryDataService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.dataAccess, useClass: LocalMemoryDataAccessApiService }
  ]
})
export class LocalMemoryDataModule { }

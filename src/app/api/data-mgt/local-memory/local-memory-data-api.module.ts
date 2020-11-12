// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { ClientsLocalMemoryDataApiService } from './clients.local-memory-data-api.service';
import { SellersLocalMemoryDataApiService } from './sellers.local-memory-data-api.service';
import { PeopleLocalMemoryDataApiService } from './people.local-memory-data-api.service';
import { ProductsLocalMemoryDataApiService } from './products.local-memory-data-api.service';
import { SalesLocalMemoryDataApiService } from './sales.local-memory-data-api.service';
import { SharedLocalMemoryDataService } from './shared.local-memory-data-api.service';
import { UsersLocalMemoryDataApiService } from './users.local-memory-data-api.service';

/**
 * Provides services that read and write data using the client's working memory
 */
@NgModule({
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.clientsCrud, useClass: ClientsLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.sellersCrud, useClass: SellersLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.people, useClass: PeopleLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedLocalMemoryDataService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersLocalMemoryDataApiService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesLocalMemoryDataApiService }
  ]
})
export class LocalMemoryDataModule { }

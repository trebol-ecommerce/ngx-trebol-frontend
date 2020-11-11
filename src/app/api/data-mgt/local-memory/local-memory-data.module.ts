// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { ClientsLocalMemoryCrudService } from './clients.local-memory-crud.service';
import { SellersLocalMemoryCrudService } from './sellers.local-memory-crud.service';
import { PeopleLocalMemoryCrudService } from './people.local-memory-crud.service';
import { ProductsLocalMemoryCrudService } from './products.local-memory-crud.service';
import { SalesLocalMemoryCrudService } from './sales.local-memory-crud.service';
import { SharedLocalMemoryDataService } from './shared.local-memory-data.service';
import { UsersLocalMemoryCrudService } from './users.local-memory-crud.service';

/**
 * Provides services that read and write data using the client's working memory
 */
@NgModule({
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.clientsCrud, useClass: ClientsLocalMemoryCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.sellersCrud, useClass: SellersLocalMemoryCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.people, useClass: PeopleLocalMemoryCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsLocalMemoryCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedLocalMemoryDataService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersLocalMemoryCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesLocalMemoryCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.storeCatalog, useClass: ProductsLocalMemoryCrudService }
  ]
})
export class LocalMemoryDataModule { }

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { ClientsHttpCrudService } from './clients.http-crud.service';
import { SellersHttpCrudService } from './sellers.http-crud.service';
import { PeopleHttpCrudService } from './people.http-crud.service';
import { ProductsHttpCrudService } from './products.http-crud.service';
import { SalesHttpCrudService } from './sales.http-crud.service';
import { SharedHttpDataService } from './shared.http-data.service';
import { UsersHttpCrudService } from './users.http-crud.service';
import { StoreCatalogHttpDataService } from './store-catalog.http-data.service';
import { HttpClientModule } from '@angular/common/http';

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
    { provide: API_SERVICE_INJECTION_TOKENS.clientsCrud, useClass: ClientsHttpCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.sellersCrud, useClass: SellersHttpCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.people, useClass: PeopleHttpCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.productsCrud, useClass: ProductsHttpCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.shared, useClass: SharedHttpDataService },
    { provide: API_SERVICE_INJECTION_TOKENS.usersCrud, useClass: UsersHttpCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.salesCrud, useClass: SalesHttpCrudService },
    { provide: API_SERVICE_INJECTION_TOKENS.storeCatalog, useClass: StoreCatalogHttpDataService }
  ]
})
export class HttpDataModule { }

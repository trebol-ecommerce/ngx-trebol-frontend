import { NgModule } from '@angular/core';
import { DATA_INJECTION_TOKENS } from '../data-injection-tokens';
import { ClientsLocalMemoryCrudService } from './clients.local-memory-crud.service';
import { EmployeesLocalMemoryCrudService } from './employees.local-memory-crud.service';
import { PeopleLocalMemoryCrudService } from './people.local-memory-crud.service';
import { ProductsLocalMemoryCrudService } from './products.local-memory-crud.service';
import { ProvidersLocalMemoryCrudService } from './providers.local-memory-crud.service';
import { PurchaseOrdersLocalMemoryCrudService } from './purchase_orders.local-memory-crud.service';
import { SalesLocalMemoryCrudService } from './sales.local-memory-crud.service';
import { SharedLocalMemoryDataService } from './shared.local-memory-data.service';
import { UsersLocalMemoryCrudService } from './users.local-memory-crud.service';

/**
 * Provides services that read and write data using the client's working memory
 */
@NgModule({
  providers: [
    { provide: DATA_INJECTION_TOKENS.clients, useClass: ClientsLocalMemoryCrudService },
    { provide: DATA_INJECTION_TOKENS.employees, useClass: EmployeesLocalMemoryCrudService },
    { provide: DATA_INJECTION_TOKENS.people, useClass: PeopleLocalMemoryCrudService },
    { provide: DATA_INJECTION_TOKENS.purchaseOrders, useClass: PurchaseOrdersLocalMemoryCrudService },
    { provide: DATA_INJECTION_TOKENS.products, useClass: ProductsLocalMemoryCrudService },
    { provide: DATA_INJECTION_TOKENS.providers, useClass: ProvidersLocalMemoryCrudService },
    { provide: DATA_INJECTION_TOKENS.shared, useClass: SharedLocalMemoryDataService },
    { provide: DATA_INJECTION_TOKENS.users, useClass: UsersLocalMemoryCrudService },
    { provide: DATA_INJECTION_TOKENS.sales, useClass: SalesLocalMemoryCrudService },
    { provide: DATA_INJECTION_TOKENS.storeCatalog, useClass: ProductsLocalMemoryCrudService }
  ]
})
export class LocalMemoryDataModule { }

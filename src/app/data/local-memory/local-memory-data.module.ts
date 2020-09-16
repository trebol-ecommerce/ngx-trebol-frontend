import { NgModule, Provider } from '@angular/core';
import { DATA_INJECTION_TOKENS } from '../data-injection-tokens';
import { ClientsLocalMemoryDataService } from './clients.local-memory-data.service';
import { EmployeesLocalMemoryDataService } from './employees.local-memory-data.service';
import { PeopleLocalMemoryDataService } from './people.local-memory-data.service';
import { ProductsLocalMemoryDataService } from './products.local-memory-data.service';
import { ProvidersLocalMemoryDataService } from './providers.local-memory-data.service';
import { PurchaseOrdersLocalMemoryDataService } from './purchase_orders.local-memory-data.service';
import { SalesLocalMemoryDataService } from './sales.local-memory-data.service';
import { SharedLocalMemoryDataService } from './shared.local-memory-data.service';
import { UsersLocalMemoryDataService } from './users.local-memory-data.service';

@NgModule({
  providers: [
    { provide: DATA_INJECTION_TOKENS.clients, useClass: ClientsLocalMemoryDataService },
    { provide: DATA_INJECTION_TOKENS.employees, useClass: EmployeesLocalMemoryDataService },
    { provide: DATA_INJECTION_TOKENS.people, useClass: PeopleLocalMemoryDataService },
    { provide: DATA_INJECTION_TOKENS.purchaseOrders, useClass: PurchaseOrdersLocalMemoryDataService },
    { provide: DATA_INJECTION_TOKENS.products, useClass: ProductsLocalMemoryDataService },
    { provide: DATA_INJECTION_TOKENS.providers, useClass: ProvidersLocalMemoryDataService },
    { provide: DATA_INJECTION_TOKENS.shared, useClass: SharedLocalMemoryDataService },
    { provide: DATA_INJECTION_TOKENS.users, useClass: UsersLocalMemoryDataService },
    { provide: DATA_INJECTION_TOKENS.sales, useClass: SalesLocalMemoryDataService }
  ]
})
export class LocalMemoryDataModule { }

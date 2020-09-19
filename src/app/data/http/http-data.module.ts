import { NgModule } from '@angular/core';
import { DATA_INJECTION_TOKENS } from '../data-injection-tokens';
import { ClientsHttpDataService } from './clients.http-data.service';
import { EmployeesHttpDataService } from './employees.http-data.service';
import { ProductsHttpDataService } from './products.http-data.service';
import { ProvidersHttpDataService } from './providers.http-data.service';
import { PurchaseOrdersHttpDataService } from './purchase_orders.http-data.service';
import { SalesHttpDataService } from './sales.http-data.service';
import { SharedHttpDataService } from './shared.http-data.service';
import { UsersHttpDataService } from './users.http-data.service';
import { StoreCatalogHttpDataService } from './store-catalog.http-data.service';

/**
 * Provides services that read and write data using an external HTTP server (defined in the environment files)
 */
@NgModule({
  providers: [
    { provide: DATA_INJECTION_TOKENS.clients, useClass: ClientsHttpDataService },
    { provide: DATA_INJECTION_TOKENS.employees, useClass: EmployeesHttpDataService },
    { provide: DATA_INJECTION_TOKENS.purchaseOrders, useClass: PurchaseOrdersHttpDataService },
    { provide: DATA_INJECTION_TOKENS.products, useClass: ProductsHttpDataService },
    { provide: DATA_INJECTION_TOKENS.providers, useClass: ProvidersHttpDataService },
    { provide: DATA_INJECTION_TOKENS.shared, useClass: SharedHttpDataService },
    { provide: DATA_INJECTION_TOKENS.users, useClass: UsersHttpDataService },
    { provide: DATA_INJECTION_TOKENS.sales, useClass: SalesHttpDataService },
    { provide: DATA_INJECTION_TOKENS.storeCatalog, useClass: StoreCatalogHttpDataService }
  ]
})
export class HttpDataModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementComponent } from './management.component';
import { ClientManagerComponent } from './routes/clients/client-manager.component';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { EmployeeManagerComponent } from './routes/employees/employee-manager.component';
import { ProductManagerComponent } from './routes/products/product-manager.component';
import { ProviderManagerComponent } from './routes/providers/provider-manager.component';
import { PurchaseOrderManagerComponent } from './routes/purchase_orders/purchase-order-manager.component';
import { SellManagerComponent } from './routes/sales/sell-manager.component';
import { UserManagerComponent } from './routes/users/user-manager.component';

const managementRoutes: Routes = [
  {
    path: 'management', component: ManagementComponent,
    children: [
      { path: 'dashboard', component: ManagementDashboardComponent },
      { path: 'clients', component: ClientManagerComponent },
      { path: 'employees', component: EmployeeManagerComponent },
      { path: 'products', component: ProductManagerComponent },
      { path: 'providers', component: ProviderManagerComponent },
      { path: 'purchase_orders', component: PurchaseOrderManagerComponent },
      { path: 'sales', component: SellManagerComponent },
      { path: 'users', component: UserManagerComponent },
      {
        path: '**', pathMatch: 'prefix', redirectTo: 'dashboard'
      }
    ],
    canActivate: [ManagementRoutingGuard],
    canActivateChild: [ManagementRoutingGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(managementRoutes)
  ],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }


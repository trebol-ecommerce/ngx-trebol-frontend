import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementComponent } from './management.component';
import { ClientManagerComponent } from './routes/clients/client-manager.component';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { EmployeeManagerComponent } from './routes/employees/employee-manager.component';
import { ProductManagerComponent } from './routes/products/product-manager.component';
import { SellManagerComponent } from './routes/sales/sell-manager.component';
import { UserManagerComponent } from './routes/users/user-manager.component';

export interface ManagementChildRoute extends Route {
  data: { matIcon: string, title: string }
}

export const MANAGEMENT_CHILD_ROUTES: ManagementChildRoute[] = [
  { path: 'dashboard', component: ManagementDashboardComponent, data: { matIcon: 'home', title: 'Resumen' } },
  { path: 'sales', component: SellManagerComponent, data: { matIcon: 'attach_money', title: 'Ventas' } },
  { path: 'products', component: ProductManagerComponent, data: { matIcon: 'store', title: 'Productos' } },
  { path: 'clients', component: ClientManagerComponent, data: { matIcon: 'person', title: 'Clientes' } },
  { path: 'employees', component: EmployeeManagerComponent, data: { matIcon: 'work', title: 'Empleados' } },
  { path: 'users', component: UserManagerComponent, data: { matIcon: 'perm_identity', title: 'Usuarios' } }
];

const managementRoutes: Routes = [
  {
    path: 'management', component: ManagementComponent,
    children: [
      ...MANAGEMENT_CHILD_ROUTES,
      {
        path: '**', pathMatch: 'full', redirectTo: 'dashboard'
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


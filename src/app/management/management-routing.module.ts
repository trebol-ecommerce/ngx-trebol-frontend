import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementComponent } from './management.component';
import { ClientManagerComponent } from './routes/clients/client-manager.component';
import { ClientManagerItemsResolver } from './routes/clients/client-manager.items-resolver';
import { ClientManagerAccessResolver } from './routes/clients/client-manager.access-resolver';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { EmployeeManagerComponent } from './routes/employees/employee-manager.component';
import { EmployeeManagerItemsResolver } from './routes/employees/employee-manager.items-resolver';
import { EmployeeManagerAccessResolver } from './routes/employees/employee-manager.access-resolver';
import { ProductManagerComponent } from './routes/products/product-manager.component';
import { ProductManagerItemsResolver } from './routes/products/product-manager.items-resolver';
import { ProductManagerAccessResolver } from './routes/products/product-manager.access-resolver';
import { SellManagerComponent } from './routes/sales/sell-manager.component';
import { SellManagerItemsResolver } from './routes/sales/sell-manager.items-resolver';
import { SellManagerAccessResolver } from './routes/sales/sell-manager.access-resolver';
import { UserManagerComponent } from './routes/users/user-manager.component';
import { UserManagerItemsResolver } from './routes/users/user-manager.items-resolver';
import { UserManagerAccessResolver } from './routes/users/user-manager.access-resolver';

export interface ManagementChildRoute extends Route {
  data: { matIcon: string, title: string }
}

export const MANAGEMENT_CHILD_ROUTES: ManagementChildRoute[] = [
  {
    path: 'dashboard', component: ManagementDashboardComponent, 
    data: { matIcon: 'home', title: 'Resumen' } 
  },
  {
    path: 'sales', component: SellManagerComponent, 
    data: { matIcon: 'attach_money', title: 'Ventas' }, 
    resolve: { access: SellManagerAccessResolver } 
  },
  {
    path: 'products', component: ProductManagerComponent, 
    data: { matIcon: 'store', title: 'Productos' }, 
    resolve: { access: ProductManagerAccessResolver } 
  },
  {
    path: 'clients', component: ClientManagerComponent, 
    data: { matIcon: 'person', title: 'Clientes' }, 
    resolve: { access: ClientManagerAccessResolver } 
  },
  {
    path: 'employees', component: EmployeeManagerComponent, 
    data: { matIcon: 'work', title: 'Empleados' }, 
    resolve: { access: EmployeeManagerAccessResolver } 
  },
  {
    path: 'users', component: UserManagerComponent, 
    data: { matIcon: 'perm_identity', title: 'Usuarios' }, 
    resolve: { access: UserManagerAccessResolver } 
  }
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


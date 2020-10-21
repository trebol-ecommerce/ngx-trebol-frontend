// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementComponent } from './management.component';
import { ClientManagerAccessResolver } from './routes/clients/client-manager.access-resolver';
import { ClientManagerComponent } from './routes/clients/client-manager.component';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { ProductManagerAccessResolver } from './routes/products/product-manager.access-resolver';
import { ProductManagerComponent } from './routes/products/product-manager.component';
import { SellManagerAccessResolver } from './routes/sales/sell-manager.access-resolver';
import { SellManagerComponent } from './routes/sales/sell-manager.component';
import { SellerManagerAccessResolver } from './routes/sellers/seller-manager.access-resolver';
import { SellerManagerComponent } from './routes/sellers/seller-manager.component';
import { UserManagerAccessResolver } from './routes/users/user-manager.access-resolver';
import { UserManagerComponent } from './routes/users/user-manager.component';

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
    data: { matIcon: 'loyalty', title: 'Ventas' }, 
    resolve: { access: SellManagerAccessResolver } 
  },
  {
    path: 'products', component: ProductManagerComponent, 
    data: { matIcon: 'list  ', title: 'Productos' }, 
    resolve: { access: ProductManagerAccessResolver } 
  },
  {
    path: 'clients', component: ClientManagerComponent, 
    data: { matIcon: 'face', title: 'Clientes' }, 
    resolve: { access: ClientManagerAccessResolver } 
  },
  {
    path: 'sellers', component: SellerManagerComponent, 
    data: { matIcon: 'work_outline', title: 'Vendedores' }, 
    resolve: { access: SellerManagerAccessResolver } 
  },
  {
    path: 'users', component: UserManagerComponent, 
    data: { matIcon: 'person  ', title: 'Usuarios' }, 
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


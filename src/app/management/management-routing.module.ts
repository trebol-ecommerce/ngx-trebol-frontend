/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementComponent } from './management.component';
import { ManagementChildRoute } from './ManagementChildRoute';
import { CustomerManagerAccessResolver } from './routes/customers/customer-manager.access-resolver';
import { CustomerManagerComponent } from './routes/customers/customer-manager.component';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { ImageManagerAccessResolver } from './routes/images/image-manager.access-resolver';
import { ImageManagerComponent } from './routes/images/image-manager.component';
import { ProductManagerAccessResolver } from './routes/products/product-manager.access-resolver';
import { ProductManagerComponent } from './routes/products/product-manager.component';
import { SellManagerAccessResolver } from './routes/sales/sell-manager.access-resolver';
import { SellManagerComponent } from './routes/sales/sell-manager.component';
import { SalespersonManagerAccessResolver } from './routes/salespeople/salesperson-manager.access-resolver';
import { SalespersonManagerComponent } from './routes/salespeople/salesperson-manager.component';
import { ShipperManagerAccessResolver } from './routes/shippers/shipper-manager.access-resolver';
import { ShipperManagerComponent } from './routes/shippers/shipper-manager.component';
import { UserManagerAccessResolver } from './routes/users/user-manager.access-resolver';
import { UserManagerComponent } from './routes/users/user-manager.component';

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
    data: { matIcon: 'list', title: 'Productos' },
    resolve: { access: ProductManagerAccessResolver }
  },
  {
    path: 'customers', component: CustomerManagerComponent,
    data: { matIcon: 'face', title: 'Clientes' },
    resolve: { access: CustomerManagerAccessResolver }
  },
  {
    path: 'salespeople', component: SalespersonManagerComponent,
    data: { matIcon: 'work_outline', title: 'Vendedores' },
    resolve: { access: SalespersonManagerAccessResolver }
  },
  {
    path: 'users', component: UserManagerComponent,
    data: { matIcon: 'person', title: 'Usuarios' },
    resolve: { access: UserManagerAccessResolver }
  },
  {
    path: 'images', component: ImageManagerComponent,
    data: { matIcon: 'image', title: 'Imágenes' },
    resolve: { access: ImageManagerAccessResolver }
  },
  {
    path: 'shippers', component: ShipperManagerComponent,
    data: { matIcon: 'local_shipping', title: 'Repartidores' },
    resolve: { access: ShipperManagerAccessResolver }
  },
];

const managementRoutes: Routes = [
  {
    path: 'management', component: ManagementComponent,
    children: [
      ...MANAGEMENT_CHILD_ROUTES,
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

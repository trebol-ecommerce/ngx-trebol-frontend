/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementRoutingAccessResolver } from './management-routing.access-resolver';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementComponent } from './management.component';
import { ManagementChildRoute } from './ManagementChildRoute';
import { ManagementCustomersComponent } from './routes/customers/management-customers.component';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { ManagementImagesComponent } from './routes/images/management-images.component';
import { ManagementProductCategoriesComponent } from './routes/product-categories/management-product-categories.component';
import { ManagementProductsComponent } from './routes/products/management-products.component';
import { ManagementSalesComponent } from './routes/sales/management-sales.component';
import { ManagementSalespeopleComponent } from './routes/salespeople/management-salespeople.component';
import { ManagementShippersComponent } from './routes/shippers/management-shippers.component';
import { ManagementUsersComponent } from './routes/users/management-users.component';

export const MANAGEMENT_CHILD_ROUTES: ManagementChildRoute[] = [
  {
    path: 'dashboard', component: ManagementDashboardComponent,
    data: {
      matIcon: 'home',
      title: $localize`:Title of page for management dashboard:Dashboard`
     }
  },
  {
    path: 'sales', component: ManagementSalesComponent,
    data: {
      matIcon: 'loyalty',
      title: $localize`:Title of page for management of sales:Sales`
    },
    resolve: { access: ManagementRoutingAccessResolver }
  },
  {
    path: 'products', component: ManagementProductsComponent,
    data: {
      matIcon: 'list',
      title: $localize`:Title of page for management of products:Products`
    },
    resolve: { access: ManagementRoutingAccessResolver }
  },
  {
    path: 'product_categories', component: ManagementProductCategoriesComponent,
    data: {
      matIcon: 'format_align_right',
      title: $localize`:Title of page for management of product categories:Categories`
    },
    resolve: { access: ManagementRoutingAccessResolver }
  },
  {
    path: 'customers', component: ManagementCustomersComponent,
    data: {
      matIcon: 'face',
      title: $localize`:Title of page for management of customers:Customers`
    },
    resolve: { access: ManagementRoutingAccessResolver }
  },
  {
    path: 'salespeople', component: ManagementSalespeopleComponent,
    data: {
      matIcon: 'work_outline',
      title: $localize`:Title of page for management of salespeople:Salespeople`
    },
    resolve: { access: ManagementRoutingAccessResolver }
  },
  {
    path: 'users', component: ManagementUsersComponent,
    data: {
      matIcon: 'person',
      title: $localize`:Title of page for management of users:Users`
    },
    resolve: { access: ManagementRoutingAccessResolver }
  },
  {
    path: 'images', component: ManagementImagesComponent,
    data: {
      matIcon: 'image',
      title: $localize`:Title of page for management of images:Images`
    },
    resolve: { access: ManagementRoutingAccessResolver }
  },
  {
    path: 'shippers', component: ManagementShippersComponent,
    data: {
      matIcon: 'local_shipping',
      title: $localize`:Title of page for management of shippers:Shippers`
    },
    resolve: { access: ManagementRoutingAccessResolver }
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

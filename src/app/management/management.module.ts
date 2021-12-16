/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementDataActionsComponent } from './components/data-actions/management-data-actions.component';
import { ManagementFooterComponent } from './components/footer/management-footer.component';
import { ManagementHeaderComponent } from './components/header/management-header.component';
import { ManagementSidenavComponent } from './components/sidenav/management-sidenav.component';
import { ProductsArrayDialogComponent } from './dialogs/products-array/products-array-dialog.component';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';
import { ManagementCustomersComponent } from './routes/customers/management-customers.component';
import { ManagementCustomersService } from './routes/customers/management-customers.service';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { ManagementImagesComponent } from './routes/images/management-images.component';
import { ManagementImagesService } from './routes/images/management-images.service';
import { ManagementProductsComponent } from './routes/products/management-products.component';
import { ManagementProductsService } from './routes/products/management-products.service';
import { ManagementSalesComponent } from './routes/sales/management-sales.component';
import { ManagementSalesService } from './routes/sales/management-sales.service';
import { ManagementSalespeopleComponent } from './routes/salespeople/management-salespeople.component';
import { ManagementSalespeopleService } from './routes/salespeople/management-salespeople.service';
import { ManagementShippersComponent } from './routes/shippers/management-shippers.component';
import { ManagementShippersService } from './routes/shippers/management-shippers.service';
import { ManagementUsersComponent } from './routes/users/management-users.component';
import { ManagementUsersService } from './routes/users/management-users.service';

const SNACKBAR_DEFAULTS: MatSnackBarConfig = {
  duration: 5000
};

@NgModule({
  declarations: [
    ManagementComponent,
    ManagementHeaderComponent,
    ManagementFooterComponent,
    ManagementSidenavComponent,
    ProductsArrayDialogComponent,
    ManagementDataActionsComponent,
    ManagementDashboardComponent,
    ManagementCustomersComponent,
    ManagementSalespeopleComponent,
    ManagementProductsComponent,
    ManagementSalesComponent,
    ManagementShippersComponent,
    ManagementUsersComponent,
    ManagementImagesComponent
  ],
  imports: [
    SharedModule,
    ManagementRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS },
    ManagementRoutingGuard,
    ManagementService,
    ManagementCustomersService,
    ManagementImagesService,
    ManagementSalespeopleService,
    ManagementProductsService,
    ManagementUsersService,
    ManagementSalesService,
    ManagementShippersService
  ]
})
export class ManagementModule { }

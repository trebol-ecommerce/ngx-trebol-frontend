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
import { DataManagerFormDialogComponent } from './dialogs/data-manager-form-dialog/data-manager-form-dialog.component';
import { ProductsArrayDialogComponent } from './dialogs/products-array/products-array-dialog.component';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';
import { CustomerManagerComponent } from './routes/customers/customer-manager.component';
import { CustomerManagerService } from './routes/customers/customer-manager.service';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { ImageManagerComponent } from './routes/images/image-manager.component';
import { ImageManagerService } from './routes/images/image-manager.service';
import { ProductManagerComponent } from './routes/products/product-manager.component';
import { ProductManagerService } from './routes/products/product-manager.service';
import { SellManagerComponent } from './routes/sales/sell-manager.component';
import { SellManagerService } from './routes/sales/sell-manager.service';
import { SalespersonManagerComponent } from './routes/salespeople/salesperson-manager.component';
import { SalespersonManagerService } from './routes/salespeople/salesperson-manager.service';
import { UserManagerComponent } from './routes/users/user-manager.component';
import { UserManagerService } from './routes/users/user-manager.service';

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
    CustomerManagerComponent,
    SalespersonManagerComponent,
    ProductManagerComponent,
    SellManagerComponent,
    UserManagerComponent,
    ImageManagerComponent,
    DataManagerFormDialogComponent
  ],
  imports: [
    SharedModule,
    ManagementRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS },
    ManagementRoutingGuard,
    ManagementService,
    CustomerManagerService,
    ImageManagerService,
    SalespersonManagerService,
    ProductManagerService,
    UserManagerService,
    SellManagerService,
  ]
})
export class ManagementModule { }

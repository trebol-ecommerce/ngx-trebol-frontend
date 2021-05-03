// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementDataActionsComponent } from './data-actions/management-data-actions.component';
import { ProductsArrayDialogComponent } from './dialogs/products-array/products-array-dialog.component';
import { ProductsArrayService } from './dialogs/products-array/products-array.service';
import { ManagementFooterComponent } from './footer/management-footer.component';
import { ManagementHeaderComponent } from './header/management-header.component';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';
import { CustomerManagerComponent } from './routes/customers/customer-manager.component';
import { CustomerManagerService } from './routes/customers/customer-manager.service';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { SalespersonManagerComponent } from './routes/salespeople/salesperson-manager.component';
import { SalespersonManagerService } from './routes/salespeople/salesperson-manager.service';
import { SalespersonManagerFormDialogComponent } from './routes/salespeople/form-dialog/salesperson-manager-form-dialog.component';
import { ProductManagerFormDialogComponent } from './routes/products/form-dialog/product-manager-form-dialog.component';
import { ProductManagerComponent } from './routes/products/product-manager.component';
import { ProductManagerService } from './routes/products/product-manager.service';
import { SellManagerFormDialogComponent } from './routes/sales/form-dialog/sell-manager-form-dialog.component';
import { SellManagerComponent } from './routes/sales/sell-manager.component';
import { SellManagerService } from './routes/sales/sell-manager.service';
import { UserManagerFormDialogComponent } from './routes/users/form-dialog/user-manager-form-dialog.component';
import { UserManagerComponent } from './routes/users/user-manager.component';
import { UserManagerService } from './routes/users/user-manager.service';
import { ManagementSidenavComponent } from './sidenav/management-sidenav.component';
import { ImagesArrayDialogComponent } from './dialogs/images-array/images-array-dialog.component';
import { ImageManagerComponent } from './routes/images/image-manager.component';
import { ImageManagerService } from './routes/images/image-manager.service';
import { ImageManagerUploadDialogComponent } from './routes/images/upload-dialog/image-manager-upload-dialog.component';

const SNACKBAR_DEFAULTS: MatSnackBarConfig = {
  duration: 5000
};

@NgModule({
  declarations: [
    ManagementComponent,
    ManagementHeaderComponent,
    ManagementFooterComponent,
    ManagementSidenavComponent,
    ImagesArrayDialogComponent,
    ProductsArrayDialogComponent,
    ManagementDataActionsComponent,
    ManagementDashboardComponent,
    CustomerManagerComponent,
    SalespersonManagerComponent,
    SalespersonManagerFormDialogComponent,
    ProductManagerComponent,
    ProductManagerFormDialogComponent,
    SellManagerComponent,
    SellManagerFormDialogComponent,
    UserManagerComponent,
    UserManagerFormDialogComponent,
    ImageManagerComponent,
    ImageManagerUploadDialogComponent
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
    SellManagerService
  ]
})
export class ManagementModule { }

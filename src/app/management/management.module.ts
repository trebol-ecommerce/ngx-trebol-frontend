import { NgModule } from '@angular/core';
import { MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { ManagementFooterComponent } from './footer/management-footer.component';
import { ManagementHeaderComponent } from './header/management-header.component';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';
import { ProductsArrayDialogComponent } from './products-array-dialog/products-array-dialog.component';
import { ClientManagerComponent } from './routes/clients/client-manager.component';
import { ClientManagerService } from './routes/clients/client-manager.service';
import { ClientManagerFormDialogComponent } from './routes/clients/form-dialog/client-manager-form-dialog.component';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { EmployeeManagerComponent } from './routes/employees/employee-manager.component';
import { EmployeeManagerService } from './routes/employees/employee-manager.service';
import { EmployeeManagerFormDialogComponent } from './routes/employees/form-dialog/employee-manager-form-dialog.component';
import { ProductManagerFormDialogComponent } from './routes/products/form-dialog/product-manager-form-dialog.component';
import { ProductManagerComponent } from './routes/products/product-manager.component';
import { ProductManagerService } from './routes/products/product-manager.service';
import { ProviderManagerFormDialogComponent } from './routes/providers/form-dialog/provider-manager-form-dialog.component';
import { ProviderManagerComponent } from './routes/providers/provider-manager.component';
import { ProviderManagerService } from './routes/providers/provider-manager.service';
import { PurchaseOrderManagerFormDialogComponent } from './routes/purchase_orders/form-dialog/purchase-order-manager-form-dialog.component';
import { PurchaseOrderManagerComponent } from './routes/purchase_orders/purchase-order-manager.component';
import { PurchaseOrderManagerService } from './routes/purchase_orders/purchase-order-manager.service';
import { SellManagerFormDialogComponent } from './routes/sales/form-dialog/sell-manager-form-dialog.component';
import { SellManagerComponent } from './routes/sales/sell-manager.component';
import { SellManagerService } from './routes/sales/sell-manager.service';
import { UserManagerFormDialogComponent } from './routes/users/form-dialog/user-manager-form-dialog.component';
import { UserManagerComponent } from './routes/users/user-manager.component';
import { UserManagerService } from './routes/users/user-manager.service';
import { ManagementSidenavComponent } from './sidenav/management-sidenav.component';

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
    ManagementDashboardComponent,
    ClientManagerComponent,
    ClientManagerFormDialogComponent,
    EmployeeManagerComponent,
    EmployeeManagerFormDialogComponent,
    ProductManagerComponent,
    ProductManagerFormDialogComponent,
    ProviderManagerComponent,
    ProviderManagerFormDialogComponent,
    SellManagerComponent,
    SellManagerFormDialogComponent,
    UserManagerComponent,
    UserManagerFormDialogComponent,
    PurchaseOrderManagerComponent,
    PurchaseOrderManagerFormDialogComponent,
  ],
  imports: [
    SharedModule,
    ManagementRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS },
    ManagementRoutingGuard,
    ManagementService,
    ClientManagerService,
    EmployeeManagerService,
    PurchaseOrderManagerService,
    ProductManagerService,
    ProviderManagerService,
    UserManagerService,
    SellManagerService
  ]
})
export class ManagementModule { }

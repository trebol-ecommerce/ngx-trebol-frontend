/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementDataActionsButtonBarComponent } from './components/data-actions-button-bar/management-data-actions-button-bar.component';
import { ManagementFooterComponent } from './components/footer/management-footer.component';
import { ManagementHeaderComponent } from './components/header/management-header.component';
import { ManagementHeaderMenuComponent } from './components/header/menu/management-header-menu.component';
import { ManagementHeaderSidenavButtonComponent } from './components/header/sidenav-button/management-header-sidenav-button.component';
import { ManagementSidenavComponent } from './components/sidenav/management-sidenav.component';
import { ManagementSidenavService } from './components/sidenav/management-sidenav.service';
import { EntityFormDialogComponent } from './dialogs/entity-form/entity-form-dialog.component';
import { ImagesArrayDialogComponent } from './dialogs/images-array/images-array-dialog.component';
import { ProductListContentsDialogComponent } from './dialogs/product-list-contents/product-list-contents-dialog.component';
import { ProductsArrayDialogComponent } from './dialogs/products-array/products-array-dialog.component';
import { ManagementOrderReviewDialogComponent } from './dialogs/order-review/management-order-review-dialog.component';
import { ImageFormComponent } from './forms/image/image-form.component';
import { ProductCategoryFormComponent } from './forms/product-category/product-category-form.component';
import { ProductListFormComponent } from './forms/product-list/product-list-form.component';
import { ProductFormComponent } from './forms/product/product-form.component';
import { SalespersonFormComponent } from './forms/salesperson/salesperson-form.component';
import { ShipperFormComponent } from './forms/shipper/shipper-form.component';
import { UserFormComponent } from './forms/user/user-form.component';
import { ManagementMaterialModule } from './management-material.module';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementRoutingService } from './management-routing.service';
import { ManagementComponent } from './management.component';
import { ManagementCustomersComponent } from './routes/customers/management-customers.component';
import { ManagementCustomersService } from './routes/customers/management-customers.service';
import { ManagementDashboardComponent } from './routes/dashboard/management-dashboard.component';
import { ManagementImagesComponent } from './routes/images/management-images.component';
import { ManagementImagesService } from './routes/images/management-images.service';
import { ManagementProductCategoriesComponent } from './routes/product-categories/management-product-categories.component';
import { ManagementProductCategoriesService } from './routes/product-categories/management-product-categories.service';
import { ManagementProductListsComponent } from './routes/product-lists/management-product-lists.component';
import { ManagementProductListsService } from './routes/product-lists/management-product-lists.service';
import { ManagementProductsComponent } from './routes/products/management-products.component';
import { ManagementProductsService } from './routes/products/management-products.service';
import { ManagementOrdersComponent } from './routes/orders/management-orders.component';
import { ManagementOrdersService } from './routes/orders/management-orders.service';
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
    ManagementDataActionsButtonBarComponent,
    ManagementFooterComponent,
    ManagementHeaderComponent,
    ManagementHeaderMenuComponent,
    ManagementHeaderSidenavButtonComponent,
    ManagementSidenavComponent,
    EntityFormDialogComponent,
    ImagesArrayDialogComponent,
    ProductListContentsDialogComponent,
    ProductsArrayDialogComponent,
    ManagementOrderReviewDialogComponent,
    ImageFormComponent,
    ProductCategoryFormComponent,
    ProductListFormComponent,
    ProductFormComponent,
    SalespersonFormComponent,
    ShipperFormComponent,
    UserFormComponent,
    ManagementComponent,
    ManagementCustomersComponent,
    ManagementDashboardComponent,
    ManagementImagesComponent,
    ManagementProductCategoriesComponent,
    ManagementProductListsComponent,
    ManagementProductsComponent,
    ManagementOrdersComponent,
    ManagementSalespeopleComponent,
    ManagementShippersComponent,
    ManagementUsersComponent
  ],
  imports: [
    SharedModule,
    ManagementMaterialModule,
    ManagementRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS },
    ManagementRoutingGuard,
    ManagementRoutingService,
    ManagementSidenavService,
    ManagementCustomersService,
    ManagementImagesService,
    ManagementProductCategoriesService,
    ManagementProductListsService,
    ManagementProductsService,
    ManagementOrdersService,
    ManagementSalespeopleService,
    ManagementShippersService,
    ManagementUsersService
  ]
})
export class ManagementModule { }

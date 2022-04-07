/*
 * Copyright (c) 2022 The Trebol eCommerce Project
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
import { ManagementHeaderMenuComponent } from './components/header/menu/management-header-menu.component';
import { ManagementHeaderSidenavButtonComponent } from './components/header/sidenav-button/management-header-sidenav-button.component';
import { ManagementSidenavComponent } from './components/sidenav/management-sidenav.component';
import { EntityFormDialogComponent } from './dialogs/entity-form/entity-form-dialog.component';
import { ImagesArrayDialogComponent } from './dialogs/images-array/images-array-dialog.component';
import { ProductListContentsDialogComponent } from './dialogs/product-list-contents/product-list-contents-dialog.component';
import { ProductsArrayDialogComponent } from './dialogs/products-array/products-array-dialog.component';
import { ManagementSellReviewDialogComponent } from './dialogs/sell-review/management-sell-review-dialog.component';
import { ImageFormComponent } from './forms/image/image-form.component';
import { ProductCategoryFormComponent } from './forms/product-category/product-category-form.component';
import { ProductListFormComponent } from './forms/product-list/product-list-form.component';
import { ProductFormComponent } from './forms/product/product-form.component';
import { SalespersonFormComponent } from './forms/salesperson/salesperson-form.component';
import { SellFormComponent } from './forms/sell/sell-form.component';
import { ShipperFormComponent } from './forms/shipper/shipper-form.component';
import { UserFormComponent } from './forms/user/user-form.component';
import { ManagementRoutingGuard } from './management-routing.guard';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementSidenavService } from './components/sidenav/management-sidenav.service';
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
import { ManagementSalesComponent } from './routes/sales/management-sales.component';
import { ManagementSalesService } from './routes/sales/management-sales.service';
import { ManagementSalespeopleComponent } from './routes/salespeople/management-salespeople.component';
import { ManagementSalespeopleService } from './routes/salespeople/management-salespeople.service';
import { ManagementShippersComponent } from './routes/shippers/management-shippers.component';
import { ManagementShippersService } from './routes/shippers/management-shippers.service';
import { ManagementUsersComponent } from './routes/users/management-users.component';
import { ManagementUsersService } from './routes/users/management-users.service';
import { ManagementRoutingService } from './management-routing.service';

const SNACKBAR_DEFAULTS: MatSnackBarConfig = {
  duration: 5000
};

@NgModule({
  declarations: [
    ImageFormComponent,
    ProductFormComponent,
    ProductCategoryFormComponent,
    ProductListFormComponent,
    SalespersonFormComponent,
    SellFormComponent,
    ShipperFormComponent,
    UserFormComponent,
    EntityFormDialogComponent,
    ImagesArrayDialogComponent,
    ProductsArrayDialogComponent,
    ManagementDataActionsComponent,
    ManagementFooterComponent,
    ManagementHeaderComponent,
    ManagementHeaderSidenavButtonComponent,
    ManagementHeaderMenuComponent,
    ManagementSidenavComponent,
    ProductListContentsDialogComponent,
    ManagementSellReviewDialogComponent,
    ManagementComponent,
    ManagementCustomersComponent,
    ManagementDashboardComponent,
    ManagementImagesComponent,
    ManagementProductCategoriesComponent,
    ManagementProductListsComponent,
    ManagementProductsComponent,
    ManagementSalesComponent,
    ManagementSalespeopleComponent,
    ManagementShippersComponent,
    ManagementUsersComponent
  ],
  imports: [
    SharedModule,
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
    ManagementSalesService,
    ManagementSalespeopleService,
    ManagementShippersService,
    ManagementUsersService
  ]
})
export class ManagementModule { }

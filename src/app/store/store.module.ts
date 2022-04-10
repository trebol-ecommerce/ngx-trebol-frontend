/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreCheckoutButtonComponent } from './components/checkout-button/store-checkout-button.component';
import { StoreCheckoutConfirmationButtonComponent } from './components/checkout-confirmation-button/store-checkout-confirmation-button.component';
import { StoreCheckoutConfirmationComponent } from './components/checkout-confirmation/store-checkout-confirmation.component';
import { StoreCheckoutRequestInformationCardComponent } from './components/checkout-request-information-card/store-checkout-request-information-card.component';
import { StoreFooterComponent } from './components/footer/store-footer.component';
import { StoreHeaderLoginButtonComponent } from './components/header/login-button/store-header-login-button.component';
import { StoreHeaderMenuComponent } from './components/header/menu/store-header-menu.component';
import { StoreHeaderNavigationComponent } from './components/header/navigation/store-header-navigation.component';
import { StoreHeaderSearchFormComponent } from './components/header/search-form/store-header-search-form.component';
import { StoreHeaderComponent } from './components/header/store-header.component';
import { StoreLocationComponent } from './components/location/store-location.component';
import { StoreProductListContentsDisplayComponent } from './components/product-list-contents-display/store-product-list-contents-display.component';
import { ProductsLotDisplayComponent } from './components/products-display/store-products-lot-display.component';
import { StoreReceiptCardComponent } from './components/receipt-card/store-receipt-card.component';
import { StoreReceiptDetailsTableComponent } from './components/receipt-details-table/store-receipt-details-table.component';
import { StoreCompanyDetailsDialogComponent } from './dialogs/about-commerce-details/store-about-commerce-details-dialog.component';
import { StoreGuestPromptDialogComponent } from './dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { StoreGuestShippingFormDialogComponent } from './dialogs/guest-shipping-form/store-guest-shipping-form-dialog.component';
import { StoreLoginFormDialogComponent } from './dialogs/login-form/store-login-form-dialog.component';
import { StoreProductDetailsDialogComponent } from './dialogs/product-details/store-product-details-dialog.component';
import { StoreRegistrationFormDialogComponent } from './dialogs/registration-form/store-registration-form-dialog.component';
import { StoreBillingDetailsFormComponent } from './forms/billing-details/store-billing-details-form.component';
import { StoreCheckoutRequestFormComponent } from './forms/checkout-request/store-checkout-request-form.component';
import { StoreShippingDetailsFormComponent } from './forms/shipping-details/store-shipping-details-form.component';
import { StoreCartReviewComponent } from './routes/cart-review/store-cart-review.component';
import { StoreCartReviewGuard } from './routes/cart-review/store-cart-review.guard';
import { StoreCatalogComponent } from './routes/catalog/store-catalog.component';
import { StoreCatalogService } from './routes/catalog/store-catalog.service';
import { StoreReceiptComponent } from './routes/receipt/store-receipt.component';
import { StoreSearchComponent } from './routes/search/store-search.component';
import { StoreMaterialModule } from './store-material.module';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';


const SNACKBAR_DEFAULTS = {
  duration: 5000
};

@NgModule({
  declarations: [
    StoreComponent,
    StoreHeaderComponent,
    StoreFooterComponent,
    StoreBillingDetailsFormComponent,
    StoreCatalogComponent,
    StoreCartReviewComponent,
    StoreCheckoutButtonComponent,
    StoreCheckoutConfirmationComponent,
    StoreCheckoutConfirmationButtonComponent,
    StoreCheckoutRequestInformationCardComponent,
    StoreCheckoutRequestFormComponent,
    StoreLocationComponent,
    StoreReceiptComponent,
    StoreReceiptCardComponent,
    StoreReceiptDetailsTableComponent,
    StoreLoginFormDialogComponent,
    StoreGuestPromptDialogComponent,
    StoreGuestShippingFormDialogComponent,
    StoreRegistrationFormDialogComponent,
    StoreProductDetailsDialogComponent,
    ProductsLotDisplayComponent,
    StoreProductListContentsDisplayComponent,
    StoreShippingDetailsFormComponent,
    StoreCompanyDetailsDialogComponent,
    StoreHeaderNavigationComponent,
    StoreHeaderMenuComponent,
    StoreHeaderLoginButtonComponent,
    StoreHeaderSearchFormComponent,
    StoreSearchComponent
  ],
  imports: [
    SharedModule,
    StoreMaterialModule,
    StoreRoutingModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS},
    StoreCartReviewGuard,
    StoreCatalogService
  ]
})
export class StoreModule { }

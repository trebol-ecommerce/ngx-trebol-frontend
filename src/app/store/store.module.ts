/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreBillingDetailsFormComponent } from './components/billing-details-form/store-billing-details-form.component';
import { StoreCartContentsTableComponent } from './components/cart-contents-table/store-cart-contents-table.component';
import { StoreCheckoutButtonComponent } from './components/checkout-button/store-checkout-button.component';
import { StoreCheckoutConfirmationComponent } from './components/checkout-confirmation/store-checkout-confirmation.component';
import { StoreCheckoutRequestFormComponent } from './components/checkout-request-form/store-checkout-request-form.component';
import { StoreFooterComponent } from './components/footer/store-footer.component';
import { StoreHeaderBrandComponent } from './components/header/brand/store-header-brand.component';
import { StoreHeaderLoginButtonComponent } from './components/header/login-button/store-header-login-button.component';
import { StoreHeaderMenuComponent } from './components/header/menu/store-header-menu.component';
import { StoreHeaderNavigationComponent } from './components/header/navigation/store-header-navigation.component';
import { StoreHeaderSearchFormComponent } from './components/header/search-form/store-header-search-form.component';
import { StoreHeaderComponent } from './components/header/store-header.component';
import { StoreLocationComponent } from './components/location/store-location.component';
import { StoreProductListContentsDisplayComponent } from './components/product-list-contents-display/store-product-list-contents-display.component';
import { StoreReceiptDetailsTableComponent } from './components/receipt-details-table/store-receipt-details-table.component';
import { StoreShippingFormComponent } from './components/shipping-form/store-shipping-form.component';
import { StoreCompanyDetailsDialogComponent } from './dialogs/company-details/store-company-details-dialog.component';
import { StoreGuestPromptDialogComponent } from './dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { StoreGuestShippingFormDialogComponent } from './dialogs/guest-shipping-form/store-guest-shipping-form-dialog.component';
import { StoreLoginFormDialogComponent } from './dialogs/login-form/store-login-form-dialog.component';
import { StoreProductDetailsDialogComponent } from './dialogs/product-details/store-product-details-dialog.component';
import { StoreRegistrationFormDialogComponent } from './dialogs/registration-form/store-registration-form-dialog.component';
import { StoreCartReviewComponent } from './routes/cart-review/store-cart-review.component';
import { StoreCartReviewGuard } from './routes/cart-review/store-cart-review.guard';
import { StoreCatalogComponent } from './routes/catalog/store-catalog.component';
import { StoreCatalogService } from './routes/catalog/store-catalog.service';
import { StoreReceiptComponent } from './routes/receipt/store-receipt.component';
import { StoreSearchComponent } from './routes/search/store-search.component';
import { StoreCheckoutService } from './store-checkout.service';
import { StoreReceiptService } from './routes/receipt/store-receipt.service';
import { StoreRoutingModule } from './store-routing.module';
import { StoreSearchService } from './store-search.service';
import { StoreComponent } from './store.component';
import { StoreReceiptCardComponent } from './routes/receipt/receipt-card/store-receipt-card.component';


const SNACKBAR_DEFAULTS = {
  duration: 5000
};

@NgModule({
  declarations: [
    StoreComponent,
    StoreCartContentsTableComponent,
    StoreHeaderComponent,
    StoreFooterComponent,
    StoreBillingDetailsFormComponent,
    StoreCatalogComponent,
    StoreCartReviewComponent,
    StoreCheckoutButtonComponent,
    StoreCheckoutConfirmationComponent,
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
    StoreProductListContentsDisplayComponent,
    StoreShippingFormComponent,
    StoreCompanyDetailsDialogComponent,
    StoreHeaderBrandComponent,
    StoreHeaderNavigationComponent,
    StoreHeaderMenuComponent,
    StoreHeaderLoginButtonComponent,
    StoreHeaderSearchFormComponent,
    StoreSearchComponent
  ],
  imports: [
    SharedModule,
    StoreRoutingModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS},
    StoreCheckoutService,
    StoreReceiptService,
    StoreCatalogService,
    StoreSearchService,
    StoreCartReviewGuard
  ]
})
export class StoreModule { }

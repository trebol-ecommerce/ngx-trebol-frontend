// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreCompanyDetailsDialogComponent } from './dialogs/company-details/store-company-details-dialog.component';
import { StoreGuestPromptDialogComponent } from './dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { StoreGuestShippingFormDialogComponent } from './dialogs/guest-shipping-form/store-guest-shipping-form-dialog.component';
import { StoreLoginFormDialogComponent } from './dialogs/login-form/store-login-form-dialog.component';
import { StorePaymentRedirectPromptDialogComponent
        } from './dialogs/payment-redirect-prompt/store-payment-redirect-prompt-dialog.component';
import { StoreProductDetailsDialogComponent } from './dialogs/product-details/store-product-details-dialog.component';
import { StoreRegistrationFormDialogComponent } from './dialogs/registration-form/store-registration-form-dialog.component';
import { StoreFooterComponent } from './components/footer/store-footer.component';
import { StoreHeaderComponent } from './components/header/store-header.component';
import { StoreCartReviewComponent } from './routes/cart-review/store-cart-review.component';
import { StoreProductCardComponent } from './components/product-card/store-product-card.component';
import { StoreCatalogComponent } from './routes/catalog/store-catalog.component';
import { StoreCatalogService } from './routes/catalog/store-catalog.service';
import { StoreReceiptComponent } from './routes/receipt/store-receipt.component';
import { StoreReceiptService } from './routes/receipt/store-receipt.service';
import { StoreService } from './store.service';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreHeaderBrandComponent } from './components/header/brand/store-header-brand.component';
import { StoreHeaderNavigationComponent } from './components/header/navigation/store-header-navigation.component';
import { StoreHeaderMiddleComponent } from './components/header/middle/store-header-middle.component';
import { StoreHeaderMenuComponent } from './components/header/menu/store-header-menu.component';
import { StoreHeaderLoginButtonComponent } from './components/header/login-button/store-header-login-button.component';
import { StoreCartReviewGuard } from './routes/cart-review/store-cart-review.guard';


const SNACKBAR_DEFAULTS = {
  duration: 5000
};

@NgModule({
  declarations: [
    StoreComponent,
    StoreHeaderComponent,
    StoreFooterComponent,
    StoreCatalogComponent,
    StoreCartReviewComponent,
    StoreReceiptComponent,
    StoreLoginFormDialogComponent,
    StoreGuestPromptDialogComponent,
    StoreGuestShippingFormDialogComponent,
    StoreRegistrationFormDialogComponent,
    StorePaymentRedirectPromptDialogComponent,
    StoreProductDetailsDialogComponent,
    StoreProductCardComponent,
    StoreCompanyDetailsDialogComponent,
    StoreHeaderBrandComponent,
    StoreHeaderNavigationComponent,
    StoreHeaderMiddleComponent,
    StoreHeaderMenuComponent,
    StoreHeaderLoginButtonComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    StoreRoutingModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS},
    StoreService,
    StoreReceiptService,
    StoreCatalogService,
    StoreCartReviewGuard
  ]
})
export class StoreModule { }

import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreFooterComponent } from './footer/store-footer.component';
import { StoreGuestPromptDialogComponent } from './guest-prompt-dialog/store-guest-prompt-dialog.component';
import { StoreGuestShippingFormDialogComponent } from './guest-shipping-form-dialog/store-guest-shipping-form-dialog.component';
import { StoreHeaderComponent } from './header/store-header.component';
import { StoreLoginFormDialogComponent } from './login-form-dialog/store-login-form-dialog.component';
import { StoreRegistrationFormDialogComponent } from './registration-form-dialog/store-registration-form-dialog.component';
import { StoreCartComponent } from './routes/cart/store-cart.component';
import { StoreCatalogComponent } from './routes/catalog/store-catalog.component';
import { StoreCatalogService } from './routes/catalog/store-catalog.service';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { StoreService } from './store.service';
import { StoreReceiptComponent } from './routes/receipt/store-receipt.component';


const SNACKBAR_DEFAULTS = {
  duration: 5000
};

@NgModule({
  declarations: [
    StoreComponent,
    StoreHeaderComponent,
    StoreCatalogComponent,
    StoreCartComponent,
    StoreLoginFormDialogComponent,
    StoreGuestPromptDialogComponent,
    StoreGuestShippingFormDialogComponent,
    StoreRegistrationFormDialogComponent,
    StoreFooterComponent,
    StoreReceiptComponent
  ],
  imports: [
    SharedModule,
    StoreRoutingModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS},
    StoreService,
    StoreCatalogService
  ]
})
export class StoreModule { }

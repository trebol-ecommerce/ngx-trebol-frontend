/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressesEditorFormComponent } from './components/addresses-editor-form/addresses-editor-form.component';
import { CartProductUnitsControlComponent } from './components/cart-product-units-control/cart-product-units-control.component';
import { CenteredMatProgressSpinnerComponent } from './components/centered-mat-spinner/centered-mat-spinner.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { DialogSwitcherButtonComponent } from './components/dialog-switcher-button/dialog-switcher-button.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { GmapComponent } from './components/gmap/gmap.component';
import { ImageUploadFormComponent } from './components/image-upload-form/image-upload-form.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductCategorySelectorFormFieldComponent } from './components/product-category-selector-form-field/product-category-selector-form-field.component';
import { ProductCategoryTreeComponent } from './components/product-category-tree/product-category-tree.component';
import { ProductFiltersPanelComponent } from './components/product-filters-panel/product-filters-panel.component';
import { ProductsDisplayComponent } from './components/products-display/products-display.component';
import { SellDetailsTableComponent } from './components/sell-details-table/sell-details-table.component';
import { SellInformationComponent } from './components/sell-information/sell-information.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { AddressFormDialogComponent } from './dialogs/address-form/address-form-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation/confirmation-dialog.component';
import { EditProfileFormDialogComponent } from './dialogs/edit-profile-form/edit-profile-form-dialog.component';
import { InformationDialogComponent } from './dialogs/information/information-dialog.component';
import { InputDialogComponent } from './dialogs/input/input-dialog.component';
import { ProductCategoryPickerDialogComponent } from './dialogs/product-category-picker/product-category-picker-dialog.component';
import { SharedDialogService } from './dialogs/shared-dialog.service';
import { EntityFormGroupFactoryService } from './entity-form-group-factory.service';
import { AddressPipe } from './pipes/address/address.pipe';
import { TrustedResourceUrlPipe } from './pipes/trusted-resource-url/trusted-resource-url.pipe';


const SHARED_DECLARATIONS = [
  AddressFormComponent,
  AddressesEditorFormComponent,
  CartProductUnitsControlComponent,
  CenteredMatProgressSpinnerComponent,
  CompanyFormComponent,
  DialogSwitcherButtonComponent,
  FileUploadComponent,
  GmapComponent,
  ImageUploadFormComponent,
  PersonFormComponent,
  ProductCardComponent,
  ProductCategorySelectorFormFieldComponent,
  ProductCategoryTreeComponent,
  ProductsDisplayComponent,
  ProductFiltersPanelComponent,
  SellDetailsTableComponent,
  SellInformationComponent,
  SlideshowComponent,
  WhatsappButtonComponent,
  AddressFormDialogComponent,
  ConfirmationDialogComponent,
  EditProfileFormDialogComponent,
  InformationDialogComponent,
  InputDialogComponent,
  ProductCategoryPickerDialogComponent,
  AddressPipe,
  TrustedResourceUrlPipe
];

@NgModule({
  declarations: [
    ...SHARED_DECLARATIONS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,

    ...SHARED_DECLARATIONS
  ],
  providers: [
    SharedDialogService,
    EntityFormGroupFactoryService
  ]
})
export class SharedModule { }

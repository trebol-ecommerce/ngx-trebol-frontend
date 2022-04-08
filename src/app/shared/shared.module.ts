/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { AddressesEditorFormComponent } from './components/addresses-editor-form/addresses-editor-form.component';
import { DialogSwitcherButtonComponent } from './components/dialog-switcher-button/dialog-switcher-button.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { GmapComponent } from './components/gmap/gmap.component';
import { HeaderBrandComponent } from './components/header-brand/header-brand.component';
import { ImageUploadFormComponent } from './components/image-upload-form/image-upload-form.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductCategorySelectorFormFieldComponent } from './components/product-category-selector-form-field/product-category-selector-form-field.component';
import { ProductCategoryTreeComponent } from './components/product-category-tree/product-category-tree.component';
import { ProductFiltersPanelComponent } from './components/product-filters-panel/product-filters-panel.component';
import { ProductsDisplayComponent } from './components/products-display/products-display.component';
import { SellDetailUnitsControlComponent } from './components/sell-detail-units-control/sell-detail-units-control.component';
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
import { AddressFormComponent } from './forms/address/address-form.component';
import { CompanyFormComponent } from './forms/company/company-form.component';
import { PersonFormComponent } from './forms/person/person-form.component';
import { AddressPipe } from './pipes/address/address.pipe';
import { TrustedResourceUrlPipe } from './pipes/trusted-resource-url/trusted-resource-url.pipe';
import { SharedMaterialModule } from './shared-material.module';


const SHARED_DECLARATIONS = [
  AddressFormComponent,
  AddressesEditorFormComponent,
  CompanyFormComponent,
  DialogSwitcherButtonComponent,
  FileUploadComponent,
  GmapComponent,
  HeaderBrandComponent,
  ImageUploadFormComponent,
  PersonFormComponent,
  ProductCardComponent,
  ProductCategorySelectorFormFieldComponent,
  ProductCategoryTreeComponent,
  ProductsDisplayComponent,
  ProductFiltersPanelComponent,
  SellDetailUnitsControlComponent,
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
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedMaterialModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedMaterialModule,

    ...SHARED_DECLARATIONS
  ],
  providers: [
    SharedDialogService
  ]
})
export class SharedModule { }

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressesEditorFormComponent } from './components/addresses-editor-form/addresses-editor-form.component';
import { CartProductUnitsControlComponent } from './components/cart-product-units-control/cart-product-units-control.component';
import { CenteredMatProgressSpinnerComponent } from './components/centered-mat-spinner/centered-mat-spinner.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { DialogSwitcherButtonComponent } from './components/dialog-switcher-button/dialog-switcher-button.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { GmapComponent } from './components/gmap/gmap.component';
import { ImageFormComponent } from './components/image-form/image-form.component';
import { ImageUploadFormComponent } from './components/image-upload-form/image-upload-form.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductCategoryFormComponent } from './components/product-category-form/product-category-form.component';
import { ProductCategorySelectorFormFieldComponent } from './components/product-category-selector-form-field/product-category-selector-form-field.component';
import { ProductCategoryTreeComponent } from './components/product-category-tree/product-category-tree.component';
import { ProductFiltersPanelComponent } from './components/product-filters-panel/product-filters-panel.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListFormComponent } from './components/product-list-form/product-list-form.component';
import { ProductsDisplayComponent } from './components/products-display/products-display.component';
import { SalespersonFormComponent } from './components/salesperson-form/salesperson-form.component';
import { SellDetailsTableComponent } from './components/sell-details-table/sell-details-table.component';
import { SellFormComponent } from './components/sell-form/sell-form.component';
import { SellInformationComponent } from './components/sell-information/sell-information.component';
import { ShipperFormComponent } from './components/shipper-form/shipper-form.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { AddressFormDialogComponent } from './dialogs/address-form/address-form-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation/confirmation-dialog.component';
import { EditProfileFormDialogComponent } from './dialogs/edit-profile-form/edit-profile-form-dialog.component';
import { EntityFormDialogComponent } from './dialogs/entity-form/entity-form-dialog.component';
import { ImagesArrayDialogComponent } from './dialogs/images-array/images-array-dialog.component';
import { InformationDialogComponent } from './dialogs/information/information-dialog.component';
import { InputDialogComponent } from './dialogs/input/input-dialog.component';
import { ProductCategoryPickerDialogComponent } from './dialogs/product-category-picker/product-category-picker-dialog.component';
import { ProductsArrayDialogComponent } from './dialogs/products-array/products-array-dialog.component';
import { FormGroupOwnerOutletDirective } from './directives/form-group-owner-outlet/form-group-owner-outlet.directive';
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
  ImageFormComponent,
  ImageUploadFormComponent,
  PersonFormComponent,
  ProductCardComponent,
  ProductCategoryFormComponent,
  ProductCategorySelectorFormFieldComponent,
  ProductCategoryTreeComponent,
  ProductsDisplayComponent,
  ProductFiltersPanelComponent,
  ProductFormComponent,
  ProductListFormComponent,
  SalespersonFormComponent,
  SellDetailsTableComponent,
  SellInformationComponent,
  SellFormComponent,
  ShipperFormComponent,
  SlideshowComponent,
  UserFormComponent,
  WhatsappButtonComponent,
  AddressFormDialogComponent,
  ConfirmationDialogComponent,
  EditProfileFormDialogComponent,
  EntityFormDialogComponent,
  ImagesArrayDialogComponent,
  InformationDialogComponent,
  InputDialogComponent,
  ProductCategoryPickerDialogComponent,
  ProductsArrayDialogComponent,
  FormGroupOwnerOutletDirective,
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
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,

    ...SHARED_DECLARATIONS
  ]
})
export class SharedModule { }

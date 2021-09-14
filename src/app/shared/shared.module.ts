// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { EditProfileFormDialogComponent } from './dialogs/edit-profile-form-dialog/edit-profile-form-dialog.component';
import { ProductFiltersPanelComponent } from './components/product-filters-panel/product-filters-panel.component';
import { CenteredMatProgressSpinnerComponent } from './components/centered-mat-spinner/centered-mat-spinner.component';
import { DialogSwitcherButtonComponent } from './components/dialog-switcher-button/dialog-switcher-button.component';
import { InformationDialogComponent } from './dialogs/information-dialog/information-dialog.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ImagesArrayDialogComponent } from './dialogs/images-array/images-array-dialog.component';
import { SalespersonFormComponent } from './components/salesperson-form/salesperson-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SellFormComponent } from './components/sell-form/sell-form.component';
import { ImageUploadFormComponent } from './components/image-upload-form/image-upload-form.component';
import { FormControlOutletComponent } from './components/form-control-outlet/form-control-outlet.component';


const PUBLIC_COMPONENTS = [
  CenteredMatProgressSpinnerComponent,
  ConfirmationDialogComponent,
  FileUploadComponent,
  PersonFormComponent,
  ProductFormComponent,
  SalespersonFormComponent,
  SellFormComponent,
  UserFormComponent,
  ProductFiltersPanelComponent,
  EditProfileFormDialogComponent,
  DialogSwitcherButtonComponent,
  InformationDialogComponent,
  SlideshowComponent,
  FormControlOutletComponent,
  ImagesArrayDialogComponent,
  ImageUploadFormComponent
];

@NgModule({
  declarations: [
    ...PUBLIC_COMPONENTS
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

    ...PUBLIC_COMPONENTS
  ]
})
export class SharedModule { }

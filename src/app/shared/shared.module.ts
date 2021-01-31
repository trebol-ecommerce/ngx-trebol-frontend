// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { EditProfileFormDialogComponent } from './edit-profile-form-dialog/edit-profile-form-dialog.component';
import { ProductFiltersPanelComponent } from './product-filters-panel/product-filters-panel.component';
import { CenteredMatProgressSpinnerComponent } from './centered-mat-spinner/component';
import { DialogSwitcherButtonComponent } from './dialog-switcher-button/dialog-switcher-button.component';


@NgModule({
  declarations: [
    CenteredMatProgressSpinnerComponent,
    ConfirmationDialogComponent,
    PersonFormComponent,
    ProductFiltersPanelComponent,
    EditProfileFormDialogComponent,
    DialogSwitcherButtonComponent
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

    CenteredMatProgressSpinnerComponent,
    ConfirmationDialogComponent,
    PersonFormComponent,
    ProductFiltersPanelComponent,
    EditProfileFormDialogComponent
  ]
})
export class SharedModule { }

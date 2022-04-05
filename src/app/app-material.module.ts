/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CenteredMatProgressSpinnerComponent } from './components/centered-mat-spinner/centered-mat-spinner.component';

const MATERIAL_MODULES = [
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    CenteredMatProgressSpinnerComponent
  ],
  imports: MATERIAL_MODULES,
  exports: [
    ...MATERIAL_MODULES,
    CenteredMatProgressSpinnerComponent
  ]
})
export class AppMaterialModule { }

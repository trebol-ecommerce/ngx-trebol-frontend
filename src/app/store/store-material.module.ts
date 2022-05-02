/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from "@angular/core";
import { MatStepperModule } from "@angular/material/stepper";

const MATERIAL_MODULES = [
  MatStepperModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class StoreMaterialModule { }

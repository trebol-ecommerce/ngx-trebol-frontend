/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";

const MATERIAL_MODULES = [
  MatSidenavModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class ManagementMaterialModule { }

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { StoreCompanyDetailsDialogComponent } from 'src/app/store/dialogs/company-details/store-company-details-dialog.component';
import { environment } from 'src/environments/environment';
import { Image } from 'src/models/entities/Image';

@Component({
  selector: 'app-store-header-brand',
  templateUrl: './store-header-brand.component.html',
  styleUrls: ['./store-header-brand.component.css']
})
export class StoreHeaderBrandComponent {

  readonly appTitle: string = environment.labels.name;
  readonly appLogo: Image = environment.staticImages.logo;

  constructor(
    // private router: Router
  ) { }

  onClickViewCompanyDetails(): void {
    // this.dialogService.open(
    //   StoreCompanyDetailsDialogComponent
    // );
  }

}

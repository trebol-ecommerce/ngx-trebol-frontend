/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP_INITIALS_TITLE, APP_LONG_TITLE } from 'src/app/app.constants';
import { StoreCompanyDetailsDialogComponent } from 'src/app/store/dialogs/company-details/store-company-details-dialog.component';

@Component({
  selector: 'app-store-header-brand',
  templateUrl: './store-header-brand.component.html',
  styleUrls: ['./store-header-brand.component.css']
})
export class StoreHeaderBrandComponent {

  readonly desktopTitle: string = APP_LONG_TITLE;
  readonly mobileTitle: string = APP_INITIALS_TITLE;

  constructor(
    private dialogService: MatDialog
  ) { }

  onClickViewCompanyDetails(): void {
    this.dialogService.open(
      StoreCompanyDetailsDialogComponent
    );
  }

}

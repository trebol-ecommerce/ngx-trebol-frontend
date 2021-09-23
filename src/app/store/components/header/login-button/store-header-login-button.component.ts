/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreLoginFormDialogComponent } from 'src/app/store/dialogs/login-form/store-login-form-dialog.component';

@Component({
  selector: 'app-store-header-login-button',
  templateUrl: './store-header-login-button.component.html',
  styleUrls: ['./store-header-login-button.component.css']
})
export class StoreHeaderLoginButtonComponent {

  constructor(
    private dialogService: MatDialog
  ) { }

  onClickLogIn(): void {
    this.dialogService.open(
      StoreLoginFormDialogComponent,
      {
        width: '24rem'
      }
    );
  }

}

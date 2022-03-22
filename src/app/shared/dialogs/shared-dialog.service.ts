/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation/confirmation-dialog.component';
import { ConfirmationDialogData } from './confirmation/ConfirmationDialogData';

@Injectable()
export class SharedDialogService {

  constructor(
    private dialogService: MatDialog
  ) { }

  requestConfirmation(data: ConfirmationDialogData) {
    return this.dialogService.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data,
        disableClose: true
      }
    ).afterClosed();
  }
}

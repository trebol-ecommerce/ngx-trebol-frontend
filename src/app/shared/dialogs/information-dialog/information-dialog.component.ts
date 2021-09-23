/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformationDialogData } from './InformationDialogData';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialogComponent {

  message: string | null;
  action = 'OK';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: InformationDialogData
  ) {
    if (data?.message) {
      this.message = data.message;
    }
    if (data?.action) {
      this.action = data.action;
    }
  }

}

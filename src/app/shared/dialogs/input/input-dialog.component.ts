/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputDialogData } from './InputDialogData';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent {

  formControl = new UntypedFormControl();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InputDialogData
  ) {
    if (data.formControl) {
      this.formControl = data.formControl;
    }
  }

}

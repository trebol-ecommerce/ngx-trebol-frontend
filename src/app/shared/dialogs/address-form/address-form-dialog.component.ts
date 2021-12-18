/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressFormDialogData } from './AddressFormDialogData';

@Component({
  selector: 'app-address-form-dialog',
  templateUrl: './address-form-dialog.component.html',
  styleUrls: ['./address-form-dialog.component.css']
})
export class AddressFormDialogComponent {

  formControl = new FormControl();
  title = $localize`:edit address|Label for action button to edit an address:Edit address`;
  hint: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Partial<AddressFormDialogData>,
    private dialog: MatDialogRef<AddressFormDialogComponent>
  ) {
    if (data.address) {
      this.formControl.setValue(data.address);
    }

    if (data.readOnly) {
      this.formControl.disable();
    }

    if ('title' in data && data.title) {
      this.title = data.title;
    }

    if ('hint' in data && data.hint) {
      this.hint = data.hint;
    }
  }

  onClickAcceptEdition(): void {
    if (this.formControl.valid) {
      this.dialog.close(this.formControl.value);
    }
  }

}

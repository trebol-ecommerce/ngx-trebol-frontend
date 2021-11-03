/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/models/entities/Address';
import { AddressFormComponent } from '../../components/address-form/address-form.component';
import { AddressFormDialogData } from './AddressFormDialogData';

@Component({
  selector: 'app-address-form-dialog',
  templateUrl: './address-form-dialog.component.html',
  styleUrls: ['./address-form-dialog.component.css']
})
export class AddressFormDialogComponent {

  address = new Address();
  readOnly = true;
  title = $localize `Editar dirección`;
  hint: string | undefined;

  @ViewChild('addressForm', { static: false }) addressForm: AddressFormComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Partial<AddressFormDialogData>,
    private dialog: MatDialogRef<AddressFormDialogComponent>
  ) {
    if (data) {
      this.load(data);
    }
  }

  private load(data: Partial<AddressFormDialogData>) {
    if (data.address) {
      this.address = data.address;
    }

    if ('readOnly' in data && typeof data.readOnly === 'boolean') {
      this.readOnly = data.readOnly;
    }

    if ('title' in data && data.title) {
      this.title = data.title;
    }

    if ('hint' in data && data.hint) {
      this.hint = data.hint;
    }
  }

  onClickAcceptEdition(): void {
    const editedAddress = this.addressForm.address;
    if (editedAddress) {
      this.dialog.close(editedAddress);
    }
  }

}

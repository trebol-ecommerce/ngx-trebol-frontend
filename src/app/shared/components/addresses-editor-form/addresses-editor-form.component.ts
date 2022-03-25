/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AddressFormDialogComponent } from 'src/app/shared/dialogs/address-form/address-form-dialog.component';
import { AddressFormDialogData } from "src/app/shared/dialogs/address-form/AddressFormDialogData";
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { Address } from 'src/models/entities/Address';

@Component({
  selector: 'app-addresses-editor-form',
  templateUrl: './addresses-editor-form.component.html',
  styleUrls: ['./addresses-editor-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressesEditorFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AddressesEditorFormComponent
    }
  ]
})
export class AddressesEditorFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  editLabel = $localize `:edit address|Label for action button to edit an address:Edit address`;
  addLabel = $localize `:add address|Label for action button to add a new address:Add address`;

  @Input() placeholder = $localize`:Name of field for a complete address:Full address`;
  @Input() savedAddresses: Address[] = [];

  formControl = new FormControl(null, Validators.required);

  constructor(
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {
    this.valueChangesSub = this.formControl.valueChanges.pipe(
      tap(v => this.onChange(v))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  onChange(value: any): void { }
  onTouched(): void { }
  onValidatorChange(): void { }

  writeValue(obj: any): void {
    this.formControl.reset(null, { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      if (this.savedAddresses.indexOf(obj) === -1) {
        this.savedAddresses.push(obj);
      }
      this.formControl.setValue(obj, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }

  onClickEdit(): void {
    const currentAddress = this.formControl.value as Address;
    const indexOfCurrentAddress = this.savedAddresses.indexOf(currentAddress);
    const dialogData: Partial<AddressFormDialogData> = {
      address: currentAddress,
      title: this.editLabel
    };
    this.dialogService.open(
      AddressFormDialogComponent,
      {
        data: dialogData,
        width: '40rem'
      }
    ).afterClosed().pipe(
      filter((address: Address) => !!address),
      tap(address => {
        this.savedAddresses[indexOfCurrentAddress] = address;
        this.formControl.setValue(address);
      })
    ).subscribe();
  }

  onClickAdd(): void {
    const dialogData: Partial<AddressFormDialogData> = {
      title: this.addLabel
    };
    this.dialogService.open(
      AddressFormDialogComponent,
      {
        data: dialogData,
        width: '40rem'
      }
    ).afterClosed().pipe(
      filter((address: Address) => !!address),
      tap(address => {
        this.savedAddresses.push(address);
        this.formControl.setValue(address);
      })
    ).subscribe();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.formControl.valid) {
      return null;
    }

    return this.formControl.errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

}

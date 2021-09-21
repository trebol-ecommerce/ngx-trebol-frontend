/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Address } from 'src/app/models/entities/Address';
import { AddressFormDialogData, AddressFormDialogComponent } from 'src/app/shared/dialogs/address-form/address-form-dialog.component';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';

@Component({
  selector: 'app-store-addresses-editor-form',
  templateUrl: './store-addresses-editor-form.component.html',
  styleUrls: ['./store-addresses-editor-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StoreAddressesEditorFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: StoreAddressesEditorFormComponent
    }
  ]
})
export class StoreAddressesEditorFormComponent
  implements OnDestroy, ControlValueAccessor, Validator {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  @Input() placeholder = 'Dirección';
  @Input() editLabel = 'Editar dirección';
  @Input() addLabel = 'Nueva dirección';
  @Input() @Output() savedAddresses: Address[] = [];

  formControl = new FormControl('', Validators.required);

  constructor(
    private dialogService: MatDialog
  ) { }

  ngOnDestroy(): void {
    for (const sub of [...this.valueChangesSubscriptions, ...this.touchedSubscriptions]) {
      sub.unsubscribe();
    }
  }

  onTouched(): void {
    this.touched.emit();
  }

  writeValue(obj: any): void {
    this.formControl.reset(null, { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      if (obj instanceof Address) {
        if (this.savedAddresses.indexOf(obj) === -1) {
          this.savedAddresses.push(obj);
        }
        this.formControl.setValue(obj, { emitEvent: false });
      }
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    const sub = this.formControl.valueChanges.subscribe(fn);
    this.valueChangesSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = this.touched.pipe(tap(fn)).subscribe();
    this.touchedSubscriptions.push(sub);
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
      tap((address: Address) => {
        if (address) {
          this.savedAddresses[indexOfCurrentAddress] = address;
          this.formControl.setValue(address);
        }
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
      tap((address: Address) => {
        if (address) {
          this.savedAddresses.push(address);
          this.formControl.setValue(address);
        }
      })
    ).subscribe();
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.formControl.errors;
  }

}
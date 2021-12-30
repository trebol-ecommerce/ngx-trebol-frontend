/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup,
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { AddressesEditorFormComponent } from 'src/app/shared/components/addresses-editor-form/addresses-editor-form.component';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { Address } from 'src/models/entities/Address';
import { StoreCartService } from '../../store-cart.service';

@Component({
  selector: 'app-store-shipping-form',
  templateUrl: './store-shipping-form.component.html',
  styleUrls: ['./store-shipping-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StoreShippingFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: StoreShippingFormComponent
    }
  ]
})
export class StoreShippingFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private touchedSubscriptions: Subscription[] = [];
  private statusChangesSubscriptions: Subscription[] = [];
  private requestShippingChangesSubscription: Subscription;
  private touched = new EventEmitter<void>();

  formGroup: FormGroup;

  get requestShipping() { return this.formGroup.get('requestShipping') as FormControl; }
  get shippingAddress() { return this.formGroup.get('shippingAddress') as FormControl; }

  @ViewChild('addressForm', { static: false }) adressForm: AddressesEditorFormComponent;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: StoreCartService
  ) {
    this.formGroup = this.formBuilder.group({
      requestShipping: [null, Validators.required],
      shippingAddress: [{ value: null, disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.requestShippingChangesSubscription = this.requestShipping.valueChanges.pipe(
      tap(isEnabled => {
        if (isEnabled) {
          this.shippingAddress.enable();
        } else {
          this.shippingAddress.reset({ value: null, disabled: true });
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    for (const sub of [...this.touchedSubscriptions, ...this.statusChangesSubscriptions]) {
      sub.unsubscribe();
    }
    this.requestShippingChangesSubscription.unsubscribe();
    this.touched.complete();
  }

  onTouched(): void {
    this.touched.emit();
  }

  writeValue(obj: any): void {
    this.requestShipping.reset(null, { emitEvent: false });
    this.shippingAddress.disable({ emitEvent: false });
    if (isJavaScriptObject(obj)) {
      if (obj instanceof Address) {
        this.requestShipping.enable({ emitEvent: false });
        this.requestShipping.setValue(true, { emitEvent: false });
        this.shippingAddress.setValue(obj, { emitEvent: false });
      } else {
        if ('requestShipping' in obj && obj.requestShipping === true) {
          this.shippingAddress.enable({ emitEvent: false });
        }
        this.formGroup.patchValue(obj, { emitEvent: false });
      }
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    const sub = this.formGroup.valueChanges.pipe(debounceTime(150), tap(fn)).subscribe();
    this.touchedSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = merge(
      this.touched,
      this.cartService.checkoutButtonPress
    ).pipe(tap(fn)).subscribe();
    this.touchedSubscriptions.push(sub);
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { required: value };
    } else {
      const errors = {} as any;
      if (!value.requestShipping && value.requestShipping !== false) {
        errors.shippingMustBeSelected = value.requestShipping;
      } else if (value.requestShipping === true && !value.shippingAddress) {
        errors.requiredShippingAddress = value.shippingAddress;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

  onParentFormTouched(): void {
    this.formGroup.markAllAsTouched();
    this.adressForm.formControl.markAsTouched();
  }

}

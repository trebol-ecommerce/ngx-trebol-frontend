/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { AddressesEditorFormComponent } from 'src/app/shared/components/addresses-editor-form/addresses-editor-form.component';
import { CompanyFormComponent } from 'src/app/shared/components/company-form/company-form.component';
import { environment } from 'src/environments/environment';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-billing-details-form',
  templateUrl: './store-billing-details-form.component.html',
  styleUrls: ['./store-billing-details-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StoreBillingDetailsFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: StoreBillingDetailsFormComponent
    }
  ]
})
export class StoreBillingDetailsFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private sellTypeChangesSubscription: Subscription;
  private touched = new EventEmitter<void>();

  formGroup: FormGroup;
  types: { [key: string]: string } = environment.labels.sellTypes;
  typesOptions = Object.keys(this.types);

  get sellType() { return this.formGroup.get('sellType') as FormControl; }
  get company() { return this.formGroup.get('company') as FormControl; }
  get address() { return this.formGroup.get('address') as FormControl; }

  @ViewChild('companyForm', { static: false }) companyForm: CompanyFormComponent;
  @ViewChild('addressForm', { static: false }) adressForm: AddressesEditorFormComponent;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService
  ) {
    this.formGroup = this.formBuilder.group({
      sellType: ['', Validators.required],
      company: [{ value: '', disabled: true }, Validators.required],
      address: [{ value: null, disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.sellTypeChangesSubscription = this.sellType.valueChanges.pipe(
      tap(v => {
        if (v === 'Enterprise Invoice') {
          this.company.enable();
          this.address.enable();
        } else if (v === 'Bill') {
          this.company.reset({ value: null, disabled: true });
          this.address.reset({ value: null, disabled: true });
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    for (const sub of [
      ...this.touchedSubscriptions,
      ...this.valueChangesSubscriptions]) {
      sub.unsubscribe();
    }
    this.sellTypeChangesSubscription.unsubscribe();
    this.touched.complete();
  }

  onTouched(): void {
    this.touched.emit();
  }

  writeValue(obj: any): void {
    this.sellType.reset(null, { emitEvent: false });
    this.company.disable({ emitEvent: false });
    this.address.disable({ emitEvent: false });
    if (isJavaScriptObject(obj)) {
      if ('sellType' in obj && obj.sellType === 'Enterprise Invoice') {
        this.company.enable({ emitEvent: false });
        this.address.enable({ emitEvent: false });
      }
      this.formGroup.patchValue(obj, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    const sub = this.formGroup.valueChanges.pipe(debounceTime(150), tap(fn)).subscribe();
    this.valueChangesSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = merge(
      this.touched,
      this.storeService.checkoutButtonPress
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
      if (!value.sellType) {
        errors.billingTypeMustBeSelected = value.sellType;
      } else if (value.sellType === 'Enterprise Invoice') {
        if (!value.company) {
          errors.billingCompanyMustBeTruthy = value.company;
        }
        if (!value.address) {
          errors.billingAddressMustBeTruthy = value.address;
        }
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

  onParentFormTouched(): void {
    this.formGroup.markAllAsTouched();
    this.companyForm.formGroup.markAllAsTouched();
    this.adressForm.formControl.markAsTouched();
  }

}

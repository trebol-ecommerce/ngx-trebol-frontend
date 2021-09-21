/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Address } from 'src/app/models/entities/Address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: [ './address-form.component.css' ]
})
export class AddressFormComponent {

  formGroup: FormGroup;

  @Input() @Output()
  get address(): Address {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      const addressData: Partial<Address> = {
        city: this.city.value,
        municipality: this.municipality.value,
        firstLine: this.firstLine.value,
        secondLine: this.secondLine.value,
        notes: this.notes.value
      };
      return Object.assign(new Address(), addressData);
    }
  }
  set address(prs: Address) {
    this.city.setValue(prs.city, { emitEvent: false, onlySelf: true });
    this.municipality.setValue(prs.municipality, { emitEvent: false, onlySelf: true });
    this.firstLine.setValue(prs.firstLine, { emitEvent: false, onlySelf: true });
    this.secondLine.setValue(prs.secondLine, { emitEvent: false, onlySelf: true });
    this.notes.setValue(prs.notes, { emitEvent: false, onlySelf: true });
  }

  get city() { return this.formGroup.get('city') as FormControl; }
  get municipality() { return this.formGroup.get('municipality') as FormControl; }
  get firstLine() { return this.formGroup.get('firstLine') as FormControl; }
  get secondLine() { return this.formGroup.get('secondLine') as FormControl; }
  get notes() { return this.formGroup.get('notes') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      city: ['', Validators.required],
      municipality: ['', Validators.required],
      firstLine: ['', Validators.required],
      secondLine: [''],
      notes: ['']
    });
  }

}

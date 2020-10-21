// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Person } from 'src/app/data/models/entities/Person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: [ './person-form.component.css' ]
})
export class PersonFormComponent {

  protected personId: number;

  @Output() public formGroup: FormGroup;

  constructor(
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      idCard: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone1: [''],
      phone2: ['']
    });
  }

  public get name(): FormControl { return this.formGroup.get('name') as FormControl; }
  public get idCard(): FormControl { return this.formGroup.get('idCard') as FormControl; }
  public get email(): FormControl { return this.formGroup.get('email') as FormControl; }
  public get address(): FormControl { return this.formGroup.get('address') as FormControl; }
  public get phone1(): FormControl { return this.formGroup.get('phone1') as FormControl; }
  public get phone2(): FormControl { return this.formGroup.get('phone2') as FormControl; }

  public asPerson(): Person {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<Person, Partial<Person>>(
        new Person(),
        {
          id: this.personId,
          name: this.name.value,
          idCard: this.idCard.value,
          email: this.email.value,
          address: this.address.value,
          phone1: this.phone1.value,
          phone2: this.phone2.value
        });
    }
  }

  @Input() public set person(prs: Person) {

    this.personId = prs.id ? prs.id : 0;
    this.name.setValue(prs.name, { emitEvent: false, onlySelf: true });
    this.idCard.setValue(prs.idCard, { emitEvent: false, onlySelf: true });
    this.email.setValue(prs.email, { emitEvent: false, onlySelf: true });
    this.address.setValue(prs.address, { emitEvent: false, onlySelf: true });
    if (prs.phone1) {
      this.phone1.setValue(String(prs.phone1), { emitEvent: false, onlySelf: true });
    }
    if (prs.phone2) {
      this.phone2.setValue(String(prs.phone2), { emitEvent: false, onlySelf: true });
    }
    this.formGroup.updateValueAndValidity();
  }

}

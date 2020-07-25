import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/data/models/entities/Person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: [ './person-form.component.css' ]
})
export class PersonFormComponent {

  @Output() public formGroup: FormGroup;

  constructor(
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      fono1: [''],
      fono2: ['']
    });
  }

  public get nombre() { return this.formGroup.get('nombre'); }
  public get rut() { return this.formGroup.get('rut'); }
  public get direccion() { return this.formGroup.get('direccion'); }
  public get email() { return this.formGroup.get('email'); }
  public get fono1() { return this.formGroup.get('fono1'); }
  public get fono2() { return this.formGroup.get('fono2'); }

  public asPerson(): Person {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<Person, Partial<Person>>(
        new Person(),
        {
          id: null,
          name: this.nombre.value,
          idCard: this.rut.value,
          address: this.direccion.value,
          email: this.email.value,
          phone1: this.fono1.value,
          phone2: this.fono2.value
        });
    }
  }

  @Input() public set person(prs: Person) {

    this.nombre.setValue(prs.name, { emitEvent: false, onlySelf: true });
    this.rut.setValue(prs.idCard, { emitEvent: false, onlySelf: true });
    this.direccion.setValue(prs.address, { emitEvent: false, onlySelf: true });
    if (prs.email) {
      this.email.setValue(prs.email, { emitEvent: false, onlySelf: true });
    }
    if (prs.phone1) {
      this.fono1.setValue(String(prs.phone1), { emitEvent: false, onlySelf: true });
    }
    if (prs.phone2) {
      this.fono2.setValue(String(prs.phone2), { emitEvent: false, onlySelf: true });
    }
    this.formGroup.updateValueAndValidity();
  }

}

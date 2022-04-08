/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Person } from 'src/models/entities/Person';
import { EntityFormGroupFactoryService } from '../../entity-form-group-factory.service';
import { PersonFormComponent } from './person-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-person-form formControlName="person"></app-person-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(PersonFormComponent, { static: true }) personFormComponent: PersonFormComponent;

  formGroup = new FormGroup({ person: new FormControl(null) });
  get person() { return this.formGroup.get('person') as FormControl; }
}

describe('PersonFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: PersonFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        PersonFormComponent,
        MockHigherOrderFormComponent
      ],
      providers: [
        EntityFormGroupFactoryService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.personFormComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(containerForm).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should not be valid at creation time', () => {
    expect(containerForm.formGroup.invalid).toBeTrue();
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should accept instances of Person as valid input', () => {
    const mockPerson: Person = {
      firstName: 'some-first-name',
      lastName: 'some-last-name',
      idNumber: 'some-id-number',
      email: 'some-email',
      phone1: 'some-phone-number',
      phone2: 'some-phone-number'
    };
    containerForm.person.setValue(mockPerson);
    expect(component.formGroup.value).toEqual(mockPerson);
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should treat non-Person-instances as invalid input', () => {
    const notAnPerson = {
      foo: 'example',
      bar: 'test'
    };
    containerForm.person.setValue(notAnPerson);
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
  });
});

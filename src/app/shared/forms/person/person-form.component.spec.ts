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
import { MOCK_PEOPLE } from 'src/app/api/local-memory/mock/mock-people.datasource';
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

const mockPerson = MOCK_PEOPLE[Math.floor(Math.random() * MOCK_PEOPLE.length)];

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
  });

  describe('before its first change', () => {
    it('should create', () => {
      expect(containerForm).toBeTruthy();
      expect(component).toBeTruthy();
    });

    it('should have a safe ControlValueAccesor stub implementation', () => {
      expect(() => {
        component.onChange(null);
        component.onTouched();
        component.writeValue(null);
        component.setDisabledState(false);
      }).not.toThrowError();
    });

    it('should have a safe Validator stub implementation', () => {
      expect(() => {
        component.onValidatorChange();
        component.validate(null);
      }).not.toThrowError();
    });
  });

  describe('after its first change detection', () => {
    beforeEach(() => {
      fixture.detectChanges();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should persist', () => {
      expect(containerForm).toBeTruthy();
      expect(component).toBeTruthy();
    });

    it('should not be valid at creation time', () => {
      expect(containerForm.formGroup.invalid).toBeTrue();
      expect(component.formGroup.invalid).toBeTrue();
    });

    it('should propagate its value to a higher order form', () => {
      expect(containerForm.person.value).not.toEqual(mockPerson);
      component.idNumber.setValue(mockPerson.idNumber);
      component.firstName.setValue(mockPerson.firstName);
      component.lastName.setValue(mockPerson.lastName);
      component.email.setValue(mockPerson.email);
      component.phone1.setValue(mockPerson.phone1);
      component.phone2.setValue(mockPerson.phone2);
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.person.value).toEqual(mockPerson);
      component.formGroup.reset({ value: null });
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.person.value).not.toEqual(mockPerson);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.person.setValue(mockPerson);
      expect(component.idNumber.value).toBe(mockPerson.idNumber);
      expect(component.firstName.value).toBe(mockPerson.firstName);
      expect(component.lastName.value).toBe(mockPerson.lastName);
      expect(component.email.value).toBe(mockPerson.email);
      expect(component.phone1.value).toBe(mockPerson.phone1);
      expect(component.phone2.value).toBe(mockPerson.phone2);
      containerForm.person.setValue(null);
      expect(component.idNumber.value).toBeFalsy();
      expect(component.firstName.value).toBeFalsy();
      expect(component.lastName.value).toBeFalsy();
      expect(component.email.value).toBeFalsy();
      expect(component.phone1.value).toBeFalsy();
      expect(component.phone2.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.formGroup.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.formGroup.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of Person as valid input', () => {
      containerForm.person.setValue(mockPerson);
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should treat non-Person-instances as invalid input', () => {
      const notAPerson = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.person.setValue(notAPerson);
      expect(component.formGroup.invalid).toBeTrue();
    });
  });
});

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MOCK_SALESPEOPLE } from 'src/app/api/local-memory/mock-data/mock-salespeople.datasource';
import { PersonFormComponent } from 'src/app/shared/forms/person/person-form.component';
import { SalespersonFormComponent } from './salesperson-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-salesperson-form formControlName="salesperson"></app-salesperson-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(SalespersonFormComponent, { static: true }) salespersonFormComponent: SalespersonFormComponent;

  formGroup = new UntypedFormGroup({ salesperson: new UntypedFormControl(null) });
  get salesperson() { return this.formGroup.get('salesperson') as UntypedFormControl; }
}

const mockSalesperson = MOCK_SALESPEOPLE[Math.floor(Math.random() * MOCK_SALESPEOPLE.length)];

describe('SalespersonFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: SalespersonFormComponent;

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
        SalespersonFormComponent,
        MockHigherOrderFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.salespersonFormComponent;
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

  describe('after its first change', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should persist', () => {
      expect(containerForm).toBeTruthy();
      expect(component).toBeTruthy();
    });

    it('should not a have valid form state at creation time', () => {
      expect(containerForm.formGroup.invalid).toBeTrue();
      expect(component.formGroup.invalid).toBeTrue();
    });

    it('should propagate its value to a higher order form', () => {
      expect(containerForm.salesperson.value).not.toEqual(mockSalesperson);
      component.person.setValue(mockSalesperson.person);
      expect(containerForm.salesperson.value).toEqual(mockSalesperson);
      component.formGroup.reset({ value: null });
      expect(containerForm.salesperson.value).not.toEqual(mockSalesperson);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.salesperson.setValue(mockSalesperson);
      expect(component.person.value).toEqual(mockSalesperson.person);
      containerForm.salesperson.setValue(null);
      expect(component.person.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.salesperson.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.salesperson.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of Salesperson as valid input', () => {
      containerForm.salesperson.setValue(mockSalesperson);
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should treat non-Salesperson-instances as invalid input', () => {
      const notASalesperson = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.salesperson.setValue(notASalesperson);
      expect(component.formGroup.invalid).toBeTrue();
    });
  });
});

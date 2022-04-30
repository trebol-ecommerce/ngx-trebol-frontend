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
import { MOCK_SALESPEOPLE } from 'src/app/api/local-memory/mock/mock-salespeople.datasource';
import { PersonFormComponent } from 'src/app/shared/forms/person/person-form.component';
import { SalespersonFormComponent } from './salesperson-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-salesperson-form formControlName="salesperson"></app-salesperson-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(SalespersonFormComponent, { static: true }) salespersonFormComponent: SalespersonFormComponent;

  formGroup = new FormGroup({ salesperson: new FormControl(null) });
  get salesperson() { return this.formGroup.get('salesperson') as FormControl; }
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

  it('should create', () => {
    expect(containerForm).toBeTruthy();
    expect(component).toBeTruthy();
  });

  describe('before its first change', () => {
    it('its ControlValueAccesor stub implementation should not break', () => {
      expect(() => {
        component.onChange(null);
        component.onTouched();
        component.writeValue(null);
        component.setDisabledState(false);
      }).not.toThrowError();
    });

    it('its Validator stub implementation should not break', () => {
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

    it('should integrate into an higher order form', () => {
      component.person.setValue(mockSalesperson.person);
      expect(containerForm.salesperson.value).toEqual(mockSalesperson);
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

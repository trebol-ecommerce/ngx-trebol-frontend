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
import { PersonFormComponent } from 'src/app/shared/forms/person/person-form.component';
import { Salesperson } from 'src/models/entities/Salesperson';
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.salespersonFormComponent;
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

  it('should accept instances of Salesperson as valid input', () => {
    const mockSalesperson: Salesperson = {
      person: {
        idNumber: 'some-id-number',
        firstName: 'some-first-name',
        lastName: 'some-last-name',
        email: 'some-email'
      }
    };
    containerForm.salesperson.setValue(mockSalesperson);
    expect(component.formGroup.value).toEqual(mockSalesperson);
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

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
  });
});

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
import { BillingCompany } from 'src/models/entities/BillingCompany';
import { CompanyFormComponent } from './company-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-company-form formControlName="company"></app-company-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(CompanyFormComponent, { static: true }) companyFormComponent: CompanyFormComponent;

  formGroup = new FormGroup({ company: new FormControl(null) });
  get company() { return this.formGroup.get('company') as FormControl; }
}

describe('CompanyFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: CompanyFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        CompanyFormComponent,
        MockHigherOrderFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.companyFormComponent;
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
    const mockCompany: BillingCompany = {
      name: 'some-name',
      idNumber: 'some-id-number'
    };
    containerForm.company.setValue(mockCompany);
    expect(component.formGroup.value).toEqual(mockCompany);
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should treat non-Person-instances as invalid input', () => {
    const notACompany = {
      foo: 'example',
      bar: 'test'
    };
    containerForm.company.setValue(notACompany);
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
  });
});

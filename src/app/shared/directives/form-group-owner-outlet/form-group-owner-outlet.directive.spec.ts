/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormGroupOwner } from 'src/models/FormGroupOwner';
import { FormGroupOwnerOutletDirective } from './form-group-owner-outlet.directive';

@Component({
  selector: 'app-mock-form-group-owner',
  template: '<form [formGroup]="formGroup"><input type="text" formControlName="test" /></form>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MockFormGroupOwnerComponent
    }
  ]
})
class MockFormGroupOwnerComponent
  implements ControlValueAccessor, FormGroupOwner {
  formGroup = new FormGroup({ test: new FormControl('') });
  writeValue(v: any) { }
  registerOnChange() { }
  registerOnTouched() { }
  setDisabledState() { }
  onParentFormTouched() { }
}

@Component({
  selector: 'app-mock-template',
  template: `
    <div appFormGroupOwnerOutlet
      [(ngModel)]="data"
      [componentType]="componentType">
    </div>`
})
class MockTemplateComponent {
  @ViewChild(FormGroupOwnerOutletDirective, { static: true }) outlet: FormGroupOwnerOutletDirective;
  data = { test: 'a' };
  componentType = MockFormGroupOwnerComponent;
}

describe('FormGroupOwnerOutletDirective', () => {
  let component: MockTemplateComponent;
  let componentFixture: ComponentFixture<MockTemplateComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        MockFormGroupOwnerComponent,
        FormGroupOwnerOutletDirective,
        MockTemplateComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    componentFixture = TestBed.createComponent(MockTemplateComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.outlet).toBeTruthy();
  });
});

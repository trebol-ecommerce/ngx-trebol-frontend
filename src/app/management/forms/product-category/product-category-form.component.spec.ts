/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryFormComponent } from './product-category-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-product-category-form formControlName="productCategory"></app-product-category-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ProductCategoryFormComponent, { static: true }) productCategoryFormComponent: ProductCategoryFormComponent;

  formGroup = new FormGroup({ productCategory: new FormControl(null) });
  get productCategory() { return this.formGroup.get('productCategory') as FormControl; }
}

@Component({
  selector: 'app-product-category-selector-field',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockProductCategorySelectorFormFieldComponent }]
})
class MockProductCategorySelectorFormFieldComponent
  implements ControlValueAccessor {
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}

describe('ProductCategoryFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: ProductCategoryFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        MockProductCategorySelectorFormFieldComponent,
        ProductCategoryFormComponent,
        MockHigherOrderFormComponent
      ],
      providers: [
        EntityFormGroupFactoryService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.productCategoryFormComponent;
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

  it('should accept instances of ProductCategory as valid input', () => {
    const mockProductCategory: ProductCategory = {
      name: 'some-name',
      code: 'some-code',
      parent: null
    };
    containerForm.productCategory.setValue(mockProductCategory);
    expect(component.formGroup.value).toEqual(mockProductCategory);
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should treat non-ProductCategory-instances as invalid input', () => {
    const notAProductCategory = {
      foo: 'example',
      bar: 'test'
    };
    containerForm.productCategory.setValue(notAProductCategory);
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
  });

});

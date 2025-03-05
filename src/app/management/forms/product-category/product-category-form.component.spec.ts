/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MOCK_PRODUCT_CATEGORIES } from 'src/app/api/local-memory/mock-data/mock-product-categories.datasource';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { ProductCategoryFormComponent } from './product-category-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-product-category-form formControlName="productCategory"></app-product-category-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ProductCategoryFormComponent, { static: true }) productCategoryFormComponent: ProductCategoryFormComponent;

  formGroup = new UntypedFormGroup({ productCategory: new UntypedFormControl(null) });
  get productCategory() { return this.formGroup.get('productCategory') as UntypedFormControl; }
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

const mockProductCategory = MOCK_PRODUCT_CATEGORIES[Math.floor(Math.random() * MOCK_PRODUCT_CATEGORIES.length)];

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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.productCategoryFormComponent;
    fixture.detectChanges();
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
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
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
      expect(containerForm.productCategory.value).not.toEqual(mockProductCategory);
      component.code.setValue(mockProductCategory.code);
      component.name.setValue(mockProductCategory.name);
      component.parent.setValue(mockProductCategory.parent);
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      // TODO can this expectation be shortened to a single line again?
      expect(containerForm.productCategory.value.code).toBe(mockProductCategory.code);
      expect(containerForm.productCategory.value.name).toBe(mockProductCategory.name);
      expect(!!containerForm.productCategory.value.parent).toBe(!!mockProductCategory.parent);
      component.formGroup.reset({ value: null });
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.productCategory.value).not.toEqual(mockProductCategory);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.productCategory.setValue(mockProductCategory);
      expect(component.code.value).toEqual(mockProductCategory.code);
      expect(component.name.value).toEqual(mockProductCategory.name);
      expect(!!component.parent.value).toBe(!!mockProductCategory.parent);
      containerForm.productCategory.setValue(null);
      expect(component.code.value).toBeFalsy();
      expect(component.name.value).toBeFalsy();
      expect(component.parent.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.formGroup.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.formGroup.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of ProductCategory as valid input', () => {
      containerForm.productCategory.setValue(mockProductCategory);
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
  });
});

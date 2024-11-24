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
import { MOCK_PRODUCT_LISTS } from 'src/app/api/local-memory/mock-data/mock-product-lists.datasource';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { ProductListFormComponent } from './product-list-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-product-list-form formControlName="productList"></app-product-list-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ProductListFormComponent, { static: true }) productListFormComponent: ProductListFormComponent;

  formGroup = new UntypedFormGroup({ productList: new UntypedFormControl(null) });
  get productList() { return this.formGroup.get('productList') as UntypedFormControl; }
}

const mockProductList = MOCK_PRODUCT_LISTS[Math.floor(Math.random() * MOCK_PRODUCT_LISTS.length)];

describe('ProductListFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: ProductListFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        ProductListFormComponent,
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
    component = containerForm.productListFormComponent;
    fixture.detectChanges();
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
      expect(containerForm.productList.value).not.toEqual(mockProductList);
      component.code.setValue(mockProductList.code);
      component.name.setValue(mockProductList.name);
      component.totalCount.setValue(mockProductList.totalCount);
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.productList.value).toEqual(mockProductList);
      component.formGroup.reset({ value: null });
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.productList.value).not.toEqual(mockProductList);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.productList.setValue(mockProductList);
      expect(component.formGroup.value).toEqual(mockProductList);
      containerForm.productList.setValue(null);
      expect(component.code.value).toBeFalsy();
      expect(component.name.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.formGroup.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.formGroup.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of ProductList as valid input', () => {
      containerForm.productList.setValue(mockProductList);
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should treat non-ProductList-instances as invalid input', () => {
      const notAProductList = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.productList.setValue(notAProductList);
      expect(component.formGroup.invalid).toBeTrue();
    });
  });
});

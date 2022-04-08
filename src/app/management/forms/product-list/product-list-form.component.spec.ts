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
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { ProductList } from 'src/models/entities/ProductList';
import { ProductListFormComponent } from './product-list-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-product-list-form formControlName="productList"></app-product-list-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ProductListFormComponent, { static: true }) productListFormComponent: ProductListFormComponent;

  formGroup = new FormGroup({ productList: new FormControl(null) });
  get productList() { return this.formGroup.get('productList') as FormControl; }
}

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

  it('should not be valid at creation time', () => {
    expect(containerForm.formGroup.invalid).toBeTrue();
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should accept instances of ProductList as valid input', () => {
    const mockProductList: ProductList = {
      code: 'some-code',
      name: 'some-name',
      totalCount: 0
    };
    containerForm.productList.setValue(mockProductList);
    expect(component.formGroup.value).toEqual(mockProductList);
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should treat non-ProductList-instances as invalid input', () => {
    const notAnImage = {
      foo: 'example',
      bar: 'test'
    };
    containerForm.productList.setValue(notAnImage);
    expect(component.formGroup.invalid).toBeTrue();
  });

  it('should respond to changes in disabled state', () => {
    containerForm.formGroup.disable();
    expect(component.formGroup.disabled).toBeTrue();
    containerForm.formGroup.enable();
    expect(component.formGroup.enabled).toBeTrue();
  });
});

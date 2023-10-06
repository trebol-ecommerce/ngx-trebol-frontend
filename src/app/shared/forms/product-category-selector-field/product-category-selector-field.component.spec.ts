/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormGroup, UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MOCK_PRODUCT_CATEGORIES } from 'src/app/api/local-memory/mock/mock-product-categories.datasource';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategorySelectorFieldComponent } from './product-category-selector-field.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-product-category-selector-field formControlName="category"></app-product-category-selector-field>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ProductCategorySelectorFieldComponent, { static: true }) personFormComponent: ProductCategorySelectorFieldComponent;

  formGroup = new UntypedFormGroup({ category: new UntypedFormControl(null) });
  get category() { return this.formGroup.get('category') as UntypedFormControl; }
}

const mockCategory = MOCK_PRODUCT_CATEGORIES[Math.floor(Math.random() * MOCK_PRODUCT_CATEGORIES.length)];

describe('ProductCategorySelectorFormFieldComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let component: ProductCategorySelectorFieldComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      declarations: [
        ProductCategorySelectorFieldComponent,
        MockHigherOrderFormComponent
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialogService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.personFormComponent;
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
    });

    it('should propagate its value to a higher order form', () => {
      expect(containerForm.category.value).not.toEqual(mockCategory);
      component.productCategory = mockCategory;
      component.onChange(mockCategory);
      expect(containerForm.category.value).toEqual(mockCategory);
      component.productCategory = null;
      component.onChange(null);
      expect(containerForm.category.value).not.toEqual(mockCategory);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.category.setValue(mockCategory);
      expect(component.productCategory).toEqual(mockCategory);
      containerForm.category.setValue(null);
      expect(component.productCategory).toBeNull();
    });

    it('should accept null as valid input', () => {
      containerForm.category.setValue(null);
      expect(containerForm.category.valid).toBeTrue();
    });

    it('should accept instances of ProductCategory as valid input', () => {
      containerForm.category.setValue(mockCategory);
      expect(component.productCategory).toEqual(mockCategory);
      expect(containerForm.category.valid).toBeTrue();
    });

    it('should treat non-ProductCategory-instances as invalid input', () => {
      const notACategory = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.category.setValue(notACategory);
      expect(containerForm.category.invalid).toBeTrue();
    });

    it('should fire the `select` event when picking a category', () => {
      const fakeCategory: ProductCategory = {
        code: 'some-code',
        name: 'some-name'
      };
      dialogServiceSpy.open.and.returnValue({ afterClosed: () => of(fakeCategory) } as MatDialogRef<any>);
      component.categorySelection.pipe(
        take(1),
        tap(selectedCategory => expect(selectedCategory).toEqual(fakeCategory))
      ).subscribe();
      component.onClickOpenCategoryPicker();
    });
  });
});

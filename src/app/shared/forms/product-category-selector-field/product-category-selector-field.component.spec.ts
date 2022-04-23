/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategorySelectorFieldComponent } from './product-category-selector-field.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-product-category-selector-field formControlName="category"></app-product-category-selector-field>'
})
class MockHigherOrderFormComponent {
  @ViewChild(ProductCategorySelectorFieldComponent, { static: true }) personFormComponent: ProductCategorySelectorFieldComponent;

  formGroup = new FormGroup({ category: new FormControl(null) });
  get category() { return this.formGroup.get('category') as FormControl; }
}

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept null as valid input', () => {
    containerForm.category.setValue(null);
    expect(component.productCategory).toBe(null);
    expect(containerForm.category.valid).toBeTrue();
  });

  it('should accept instances of ProductCategory as valid input', () => {
    const fakeCategory: ProductCategory = {
      code: 'some-code',
      name: 'some-name'
    };
    containerForm.category.setValue(fakeCategory);
    expect(component.productCategory).toEqual(fakeCategory);
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

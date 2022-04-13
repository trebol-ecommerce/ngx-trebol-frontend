/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryTreeService } from '../../components/product-category-tree/product-category-tree.service';
import { ProductCategoryPickerDialogComponent } from './product-category-picker-dialog.component';

@Component({ selector: 'app-product-category-tree' })
class MockProductCategoryTreeComponent {
  @Input() categories: any[];
  @Input() editable: boolean;
  @Input() selectionEnabled: boolean;
  @Output() selection = new EventEmitter<void>();
}

describe('ProductCategoryPickerDialogComponent', () => {
  let component: ProductCategoryPickerDialogComponent;
  let fixture: ComponentFixture<ProductCategoryPickerDialogComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(waitForAsync(() => {
    const mockDialog = jasmine.createSpyObj('MatDialogRef', ['close']);
    const mockProductCategoryTreeService = jasmine.createSpyObj('ProductCategoryTreeService', ['reloadCategories']);

    TestBed.configureTestingModule({
      declarations: [
        MockProductCategoryTreeComponent,
        ProductCategoryPickerDialogComponent
      ],
      providers: [
        { provide: ProductCategoryTreeService, useValue: mockProductCategoryTreeService },
        { provide: MatDialogRef, useValue: mockDialog }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    dialogSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<any>>;

    fixture = TestBed.createComponent(ProductCategoryPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close referencing a category after being selected', () => {
    const category: ProductCategory = {
      code: 'some-code',
      name: 'some-name'
    };
    component.onSelect(category);
    expect(dialogSpy.close).toHaveBeenCalled();
    expect(dialogSpy.close).toHaveBeenCalledWith(category);
  });
});

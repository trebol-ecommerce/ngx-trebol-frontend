/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryPickerDialogComponent } from './product-category-picker-dialog.component';

describe('ProductCategoryPickerDialogComponent', () => {
  let component: ProductCategoryPickerDialogComponent;
  let fixture: ComponentFixture<ProductCategoryPickerDialogComponent>;
  let mockApiService: Partial<ITransactionalEntityDataApiService<ProductCategory>>;
  let mockDialog: Partial<MatDialogRef<ProductCategoryPickerDialogComponent>>;

  beforeEach(waitForAsync(() => {
    mockApiService = {
      fetchPage() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      }
    };
    mockDialog = {
      close() { }
    };

    TestBed.configureTestingModule({
      declarations: [ProductCategoryPickerDialogComponent],
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.dataProductCategories, useValue: mockApiService },
        { provide: MatDialogRef, useValue: mockDialog }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { MOCK_PRODUCTS } from 'src/app/api/local-memory/mock/mock-products.datasource';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Product } from 'src/models/entities/Product';
import { ProductsArrayDialogComponent } from './products-array-dialog.component';

const MOCK_PRODUCT_EXAMPLE = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-product-filters-panel' })
class MockProductFiltersPanelComponent {
  @Output() filtersChanges = new EventEmitter();
}

describe('ProductsArrayDialogComponent', () => {
  let component: ProductsArrayDialogComponent;
  let fixture: ComponentFixture<ProductsArrayDialogComponent>;
  let apiServiceSpy: jasmine.SpyObj<IEntityDataApiService<Product>>;

  beforeEach(waitForAsync(() => {
    const mockApiService = jasmine.createSpyObj('IEntityDataApiService<Product>', ['fetchPage']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatExpansionModule,
        MatDialogModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule
      ],
      declarations: [
        ProductsArrayDialogComponent,
        MockCenteredMatSpinnerComponent,
        MockProductFiltersPanelComponent
      ],
      providers: [
        { provide: API_INJECTION_TOKENS.dataProducts, useValue: mockApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    apiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataProducts) as jasmine.SpyObj<ITransactionalEntityDataApiService<Product>>;
    apiServiceSpy.fetchPage.and.returnValue(of({
      items: [
        MOCK_PRODUCT_EXAMPLE
      ],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 1
    }));

    fixture = TestBed.createComponent(ProductsArrayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reload data', () => {
    component.reload();
    expect(apiServiceSpy.fetchPage).toHaveBeenCalled();
  });

  it('should reload data when a page event is fired', () => {
    const ev: PageEvent = { length: 10, pageIndex: 1, pageSize: 5 };
    component.onPage(ev);
    expect(apiServiceSpy.fetchPage).toHaveBeenCalled();
  });

  it('should include products into its array', () => {
    expect(component.selectedProducts.length).toBe(0);
    component.onClickIncludeProductIntoSelection(MOCK_PRODUCT_EXAMPLE);
    expect(component.selectedProducts.length).toBe(1);
    expect(component.selectedProducts[0]).toEqual(MOCK_PRODUCT_EXAMPLE);
  });

  it('should not accept duplicate products into its array', () => {
    component.onClickIncludeProductIntoSelection(MOCK_PRODUCT_EXAMPLE);
    component.onClickIncludeProductIntoSelection(MOCK_PRODUCT_EXAMPLE);
    component.onClickIncludeProductIntoSelection(MOCK_PRODUCT_EXAMPLE);
    expect(component.selectedProducts.length).toBe(1);
  });

  it('should remove products from its array', () => {
    component.onClickIncludeProductIntoSelection(MOCK_PRODUCT_EXAMPLE);
    expect(component.selectedProducts.length).toBe(1);
    component.onClickDropFromSelection(0);
    expect(component.selectedProducts.length).toBe(0);
  });
});

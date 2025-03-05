/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { MOCK_PRODUCTS } from 'src/app/api/local-memory/mock-data/mock-products.datasource';
import { Product } from 'src/models/entities/Product';
import { StoreCartService } from '../../store-cart.service';
import { StoreSearchService } from '../../store-search.service';
import { StoreCatalogService } from '../catalog/store-catalog.service';
import { StoreSearchComponent } from './store-search.component';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatProgressSpinnerComponent { }

@Component({ selector: 'app-product-card' })
class MockProductCardComponent {
  @Input() showAddToCartButton: boolean;
  @Input() product: Product;
  @Output() addToCart = new EventEmitter<void>();
  @Output() view = new EventEmitter<void>();
}

describe('StoreSearchComponent', () => {
  let component: StoreSearchComponent;
  let fixture: ComponentFixture<StoreSearchComponent>;
  let searchServiceSpy: jasmine.SpyObj<StoreSearchService>;
  let cartServiceSpy: jasmine.SpyObj<StoreCartService>;
  let catalogServiceSpy: jasmine.SpyObj<StoreCatalogService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(waitForAsync(() => {
    const mockSearchService = jasmine.createSpyObj('StoreSearchService', ['updateSearchQuery', 'reload', 'paginate']);
    const mockCartService = jasmine.createSpyObj('StoreCartService', ['addProductToCart']);
    const mockStoreCatalogService = jasmine.createSpyObj('StoreCatalogService', ['navigateToProductDetails']);
    mockActivatedRoute = {
      queryParams: of({})
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatIconModule,
        MatPaginatorModule
      ],
      declarations: [
        StoreSearchComponent,
        MockCenteredMatProgressSpinnerComponent,
        MockProductCardComponent
      ],
      providers: [
        { provide: StoreSearchService, useValue: mockSearchService },
        { provide: StoreCartService, useValue: mockCartService },
        { provide: StoreCatalogService, useValue: mockStoreCatalogService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    searchServiceSpy = TestBed.inject(StoreSearchService) as jasmine.SpyObj<StoreSearchService>;
    cartServiceSpy = TestBed.inject(StoreCartService) as jasmine.SpyObj<StoreCartService>;
    catalogServiceSpy = TestBed.inject(StoreCatalogService) as jasmine.SpyObj<StoreCatalogService>;
    searchServiceSpy.paginate.and.returnValue(EMPTY);
    searchServiceSpy.reload.and.returnValue(EMPTY);
    searchServiceSpy.isLoadingSearch$ = of(false),
    searchServiceSpy.currentPage$ = of({
      items: [],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 0
    });

    fixture = TestBed.createComponent(StoreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data right away', () => {
    expect(searchServiceSpy.reload).toHaveBeenCalled();
  });

  it('should paginate data', () => {
    const ev: PageEvent = { pageIndex: 1, pageSize: 5, length: 10 };
    component.onPage(ev);
    expect(searchServiceSpy.paginate).toHaveBeenCalled();
  });

  it('should add products to cart', () => {
    const mockProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    component.onAddProductToCart(mockProduct);
    expect(cartServiceSpy.addProductToCart).toHaveBeenCalled();
  });

  it('should display details of products', () => {
    const mockProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    component.onViewProduct(mockProduct);
    expect(catalogServiceSpy.navigateToProductDetails).toHaveBeenCalled();
  });

  it('should fail to display non-products', () => {
    expect(() => component.onViewProduct(null)).toThrowError();
    expect(catalogServiceSpy.navigateToProductDetails).not.toHaveBeenCalled();
  });
});

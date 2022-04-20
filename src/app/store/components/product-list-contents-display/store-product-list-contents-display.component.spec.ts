/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { Product } from 'src/models/entities/Product';
import { observeIfEventFiresUponCallback } from 'src/test-functions/observeIfEventFiresUponCallback';
import { StoreCatalogService } from '../../routes/catalog/store-catalog.service';
import { StoreProductListContentsDisplayComponent } from './store-product-list-contents-display.component';


@Component({ selector: 'store-products-lot-display' })
class MockProductsDisplayComponent {
  @Input() loading: boolean;
  @Input() products: Product[];
  @Input() totalCount: number;
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() showAddToCartButtons: boolean;
  @Output() page = new EventEmitter<void>();
  @Output() addProductToCart = new EventEmitter<void>();
  @Output() viewProduct = new EventEmitter<void>();
}

describe('StoreProductListContentsDisplayComponent', () => {
  let component: StoreProductListContentsDisplayComponent;
  let fixture: ComponentFixture<StoreProductListContentsDisplayComponent>;
  let mockListApiService: Partial<ITransactionalProductListContentsDataApiService>;
  let storeCatalogServiceSpy: jasmine.SpyObj<StoreCatalogService>;

  beforeEach(waitForAsync(() => {
    mockListApiService = {
      fetchContents() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      }
    };
    const mockStoreCatalogService = jasmine.createSpyObj('StoreCatalogService', ['navigateToProductDetails'])

    TestBed.configureTestingModule({
      declarations: [
        StoreProductListContentsDisplayComponent,
        MockProductsDisplayComponent
      ],
      providers: [
        { provide: API_INJECTION_TOKENS.dataProductLists, useValue: mockListApiService },
        { provide: StoreCatalogService, useValue: mockStoreCatalogService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    storeCatalogServiceSpy = TestBed.inject(StoreCatalogService) as jasmine.SpyObj<StoreCatalogService>;

    fixture = TestBed.createComponent(StoreProductListContentsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire an `addProductToCart` event', () => {
    observeIfEventFiresUponCallback(
      component.addProductToCart,
      () => component.onAddProductToCart(null),
      timer(1)
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });
});

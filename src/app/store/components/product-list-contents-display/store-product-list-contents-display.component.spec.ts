/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { Product } from 'src/models/entities/Product';
import { StoreCatalogService } from '../../routes/catalog/store-catalog.service';
import { StoreProductListContentsDisplayComponent } from './store-product-list-contents-display.component';


@Component({ selector: 'app-products-display' })
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
  let mockStoreCatalogService: Partial<StoreCatalogService>;

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
    mockStoreCatalogService = {
      viewProduct() { }
    };

    TestBed.configureTestingModule({
      declarations: [
        StoreProductListContentsDisplayComponent,
        MockProductsDisplayComponent
      ],
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.dataProductLists, useValue: mockListApiService },
        { provide: StoreCatalogService, useValue: mockStoreCatalogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductListContentsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

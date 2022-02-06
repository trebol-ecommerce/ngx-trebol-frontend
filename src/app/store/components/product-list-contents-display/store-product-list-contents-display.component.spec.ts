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
import { IProductListContentsDataApiService } from 'src/app/api/transactional-product-lists.data.api.iservice';
import { Product } from 'src/models/entities/Product';
import { StoreCatalogService } from '../../routes/catalog/store-catalog.service';
import { StoreProductListContentsDisplayComponent } from './store-product-list-contents-display.component';


@Component({ selector: 'app-store-product-display' })
class MockStoreProductDisplayComponent {
  @Input() products: Product[];
  @Input() totalCount: number;
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Output() page = new EventEmitter();
}

describe('StoreProductListContentsDisplayComponent', () => {
  let component: StoreProductListContentsDisplayComponent;
  let fixture: ComponentFixture<StoreProductListContentsDisplayComponent>;
  let mockListApiService: Partial<IProductListContentsDataApiService>;
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
        MockStoreProductDisplayComponent
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

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
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
  let mockSearchService: Partial<StoreSearchService>;
  let mockCartService: Partial<StoreCartService>;
  let mockCatalogService: Partial<StoreCatalogService>;

  beforeEach(waitForAsync(() => {
    mockSearchService = {
      isLoadingSearch$: of(false),
      currentPage$: of({
        items: [],
        pageIndex: 0,
        pageSize: 10,
        totalCount: 0
      }),
      readQueryParams() { },
      reload() { return of(void 0); },
      paginate() { return of(void 0); }
    };
    mockCartService = {
      addProductToCart() { }
    };
    mockCatalogService = {
      viewProduct() { }
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
        { provide: StoreCatalogService, useValue: mockCatalogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

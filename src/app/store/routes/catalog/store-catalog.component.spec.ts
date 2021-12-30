/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { merge, of, timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';
import { StoreCartService } from '../../store-cart.service';
import { StoreCatalogComponent } from './store-catalog.component';
import { StoreCatalogService } from './store-catalog.service';

@Component({ selector: 'app-product-filters-panel' })
class MockProductFiltersPanelComponent {
  @Output() filtersChanges = new EventEmitter();
}

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-store-product-card' })
class MockStoreCatalogProductCardComponent {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter();
  @Output() view = new EventEmitter();
}

describe('StoreCatalogComponent', () => {
  let component: StoreCatalogComponent;
  let fixture: ComponentFixture<StoreCatalogComponent>;
  let mockCatalogService: Partial<StoreCatalogService>;
  let mockCartService: Partial<StoreCartService>;

  beforeEach(waitForAsync(() => {
    mockCatalogService = {
      loading$: of(false),
      lists$: of([]),
      reloadItems() {},
      viewProduct(p) {}
    };
    spyOn(mockCatalogService, 'reloadItems');
    mockCartService = {
      addProductToCart(p) {}
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        StoreCatalogComponent ,
        MockProductFiltersPanelComponent,
        MockCenteredMatSpinnerComponent,
        MockStoreCatalogProductCardComponent
      ],
      providers: [
        { provide: StoreCatalogService, useValue: mockCatalogService },
        { provide: StoreCartService, useValue: mockCartService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load items inmediately', () => {
    let lists: ProductList[];
    merge(
      timer(100).pipe(
        tap(() => expect(lists).toBeTruthy())
      ),
      component.lists$.pipe(
        take(1),
        tap(p => { lists = p; })
      )
    ).subscribe();
  });
});

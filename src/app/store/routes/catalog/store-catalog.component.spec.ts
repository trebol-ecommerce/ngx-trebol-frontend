/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { StoreService } from '../../store.service';
import { StoreCatalogComponent } from './store-catalog.component';
import { StoreCatalogService } from './store-catalog.service';

@Component({ selector: 'app-product-filters-panel' })
class MockProductFiltersPanelComponent { }

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-store-catalog-product-card' })
class MockStoreCatalogProductCardComponent { }

describe('StoreCatalogComponent', () => {
  let component: StoreCatalogComponent;
  let fixture: ComponentFixture<StoreCatalogComponent>;
  let catalogService: Partial<StoreCatalogService>;
  let storeService: Partial<StoreService>;

  beforeEach(waitForAsync(() => {
    catalogService = {
      loading$: of(false),
      items$: of([]),
      reloadItems() {},
      filters: {},
      viewProduct(p) {}
    };
    spyOn(catalogService, 'reloadItems');
    storeService = {
      addProductToCart(p) {}
    };

    TestBed.configureTestingModule({
      declarations: [
        StoreCatalogComponent ,
        MockProductFiltersPanelComponent,
        MockCenteredMatSpinnerComponent,
        MockStoreCatalogProductCardComponent
      ],
      providers: [
        { provide: StoreCatalogService, useValue: catalogService },
        { provide: StoreService, useValue: storeService },
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
    let items: Product[];
    component.products$.subscribe(p => { items = p; });
    expect(items).toBeTruthy();
  });

  it('should reload items upon changing filtering conditions', () => {
    component.onFiltersChange({});
    expect(catalogService.reloadItems).toHaveBeenCalled();
  });
});

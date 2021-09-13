// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { StoreCatalogComponent } from './store-catalog.component';
import { StoreCatalogService } from './store-catalog.service';
import { Product } from 'src/app/models/entities/Product';
import { Component } from '@angular/core';

@Component({ selector: 'app-product-filters-panel' })
class MockProductFiltersPanelComponent { }
@Component({ selector: 'centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }
@Component({ selector: 'app-store-catalog-product-card' })
class MockStoreCatalogProductCardComponent { }

describe('StoreCatalogComponent', () => {
  let component: StoreCatalogComponent;
  let fixture: ComponentFixture<StoreCatalogComponent>;
  let catalogService: Partial<StoreCatalogService>;

  beforeEach(waitForAsync(() => {
    catalogService = {
      loading$: of(false),
      items$: of([]),
      reloadItems() {},
      filters: {}
    };
    spyOn(catalogService, 'reloadItems');

    TestBed.configureTestingModule({
      declarations: [
        StoreCatalogComponent ,
        MockProductFiltersPanelComponent,
        MockCenteredMatSpinnerComponent,
        MockStoreCatalogProductCardComponent
      ],
      providers: [
        { provide: StoreCatalogService, useValue: catalogService }
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

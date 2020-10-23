// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StoreCatalogComponent } from './store-catalog.component';
import { StoreCatalogService } from './store-catalog.service';
import { Product } from 'src/app/data/models/entities/Product';

describe('StoreCatalogComponent', () => {
  let component: StoreCatalogComponent;
  let fixture: ComponentFixture<StoreCatalogComponent>;
  let catalogService: Partial<StoreCatalogService>;

  beforeEach(async(() => {
    catalogService = {
      loading$: of(false),
      items$: of([]),
      reloadItems() {},
      filters: {}
    };
    spyOn(catalogService, 'reloadItems');

    TestBed.configureTestingModule({
      declarations: [ StoreCatalogComponent ],
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
    let items: Product[];
    component.products$.subscribe(p => { items = p; });
    expect(component).toBeTruthy();
    expect(component).toBe([]);
  });

  it('should reload items upon changing filtering conditions', () => {
    component.onFiltersChange({});
    expect(catalogService.reloadItems).toHaveBeenCalled();
  });
});

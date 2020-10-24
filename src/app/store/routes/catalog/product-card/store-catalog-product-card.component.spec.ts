// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCatalogProductCardComponent } from './store-catalog-product-card.component';
import { StoreService } from 'src/app/store/store.service';
import { StoreCatalogService } from '../store-catalog.service';

describe('StoreCatalogProductCardComponent', () => {
  let component: StoreCatalogProductCardComponent;
  let fixture: ComponentFixture<StoreCatalogProductCardComponent>;
  let storeService: Partial<StoreService>;
  let catalogService: Partial<StoreCatalogService>;

  beforeEach(async(() => {
    storeService = {
      addProductToCart(p) {}
    };
    catalogService = {
      viewProduct(p) {}
    };

    TestBed.configureTestingModule({
      declarations: [ StoreCatalogProductCardComponent ],
      providers: [
        { provide: StoreService, useValue: storeService },
        { provide: StoreCatalogService, useValue: catalogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCatalogProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

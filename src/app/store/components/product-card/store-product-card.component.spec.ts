// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreProductCardComponent } from './store-product-card.component';
import { StoreService } from 'src/app/store/store.service';
import { StoreCatalogService } from 'src/app/store/routes/catalog/store-catalog.service';

describe('StoreProductCardComponent', () => {
  let component: StoreProductCardComponent;
  let fixture: ComponentFixture<StoreProductCardComponent>;
  let storeService: Partial<StoreService>;
  let catalogService: Partial<StoreCatalogService>;

  beforeEach(waitForAsync(() => {
    storeService = {
      addProductToCart(p) {}
    };
    catalogService = {
      viewProduct(p) {}
    };

    TestBed.configureTestingModule({
      declarations: [ StoreProductCardComponent ],
      providers: [
        { provide: StoreService, useValue: storeService },
        { provide: StoreCatalogService, useValue: catalogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductsArrayDialogComponent } from './products-array-dialog.component';
import { ProductsArrayService } from './products-array.service';

describe('ProductsArrayDialogComponent', () => {
  let component: ProductsArrayDialogComponent;
  let fixture: ComponentFixture<ProductsArrayDialogComponent>;
  let productsArrayService: Partial<ProductsArrayService>;

  beforeEach(waitForAsync(() => {
    productsArrayService = {
      filteredProductsArray$: of([]),
      productsArray$: of([]),
      loading$: of(false),
      changeFiltersTo(f) {},
      includeProduct(p) {},
      dropProductByIndex(i) {}
    },
    TestBed.configureTestingModule({
      declarations: [ ProductsArrayDialogComponent ],
      providers: [
        { provide: ProductsArrayService, useValue: productsArrayService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsArrayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

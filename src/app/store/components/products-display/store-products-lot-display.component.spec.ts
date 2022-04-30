/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { observeIfEventFiresUponCallback } from 'src/test-functions/observeIfEventFiresUponCallback';
import { ProductsLotDisplayComponent } from './store-products-lot-display.component';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-product-card' })
class MockStoreProductCardComponent {
  @Input() product: Product;
}

describe('ProductsLotDisplayComponent', () => {
  let component: ProductsLotDisplayComponent;
  let fixture: ComponentFixture<ProductsLotDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatIconModule,
        MatPaginatorModule
      ],
      declarations: [
        ProductsLotDisplayComponent,
        MockCenteredMatSpinnerComponent,
        MockStoreProductCardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsLotDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire a `decrease` event', () => {
    observeIfEventFiresUponCallback(
      component.addProductToCart,
      () => component.onAddProductToCart(null)
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });

  it('should fire a `decrease` event', () => {
    observeIfEventFiresUponCallback(
      component.viewProduct,
      () => component.onViewProduct(null)
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });

  it('should fire a `decrease` event', () => {
    observeIfEventFiresUponCallback(
      component.page,
      () => component.onPage(null)
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });
});

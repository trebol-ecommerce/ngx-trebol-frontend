/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Product } from 'src/models/entities/Product';
import { ProductsDisplayComponent } from './products-display.component';

@Component({ selector: 'app-product-card' })
class MockStoreProductCardComponent {
  @Input() product: Product;
}

describe('ProductsDisplayComponent', () => {
  let component: ProductsDisplayComponent;
  let fixture: ComponentFixture<ProductsDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatIconModule,
        MatPaginatorModule
      ],
      declarations: [
        ProductsDisplayComponent,
        MockStoreProductCardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
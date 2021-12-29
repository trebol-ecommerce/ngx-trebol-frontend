/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Product } from 'src/models/entities/Product';
import { StoreProductListContentsDisplayComponent } from './store-product-list-contents-display.component';


@Component({ selector: 'app-store-product-display' })
class MockStoreProductDisplayComponent {
  @Input() products: Product[];
  @Input() totalCount: number;
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Output() page = new EventEmitter();
}

describe('StoreProductListContentsDisplayComponent', () => {
  let component: StoreProductListContentsDisplayComponent;
  let fixture: ComponentFixture<StoreProductListContentsDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreProductListContentsDisplayComponent,
        MockStoreProductDisplayComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductListContentsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Product } from 'src/models/entities/Product';
import { StoreCartService } from '../../store-cart.service';
import { StoreProductDetailsDialogComponent } from './store-product-details-dialog.component';
import { StoreProductDetailsDialogData } from "./StoreProductDetailsDialogData";

@Component({ selector: 'app-slideshow' })
class MockSlideshowComponent {
  @Input() images: any[];
  @Input() automaticSlide: boolean;
}

describe('StoreProductDetailsDialogComponent', () => {
  let component: StoreProductDetailsDialogComponent;
  let fixture: ComponentFixture<StoreProductDetailsDialogComponent>;
  let cartService: Partial<StoreCartService>;
  let mockDialogData: Partial<StoreProductDetailsDialogData>;

  beforeEach(waitForAsync(() => {
    cartService = {
      cartDetails$: of([]),
      increaseProductUnits(i) {},
      addProductToCart(p) {},
      decreaseProductUnits(i) {}
    };
    mockDialogData = {
      product: new Product()
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule
      ],
      declarations: [
        StoreProductDetailsDialogComponent,
        MockSlideshowComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: StoreCartService, useValue: cartService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

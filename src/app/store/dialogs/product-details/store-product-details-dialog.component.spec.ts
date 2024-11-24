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
import { MOCK_PRODUCTS } from 'src/app/api/local-memory/mock-data/mock-products.datasource';
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
  let cartServiceSpy: jasmine.SpyObj<StoreCartService>;
  let mockDialogData: Partial<StoreProductDetailsDialogData>;

  beforeEach(waitForAsync(() => {
    const mockCartService = jasmine.createSpyObj('StoreCartService', ['increaseProductUnits', 'addProductToCart', 'decreaseProductUnits']);
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
        { provide: StoreCartService, useValue: mockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    cartServiceSpy = TestBed.inject(StoreCartService) as jasmine.SpyObj<StoreCartService>;
    cartServiceSpy.cartDetails$ = of([]);

    fixture = TestBed.createComponent(StoreProductDetailsDialogComponent);
    component = fixture.componentInstance;
  });

  describe('when the product is not in the cart', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should add products to the cart when not added yet', () => {
      component.onClickIncreaseProductQuantity();
      expect(cartServiceSpy.addProductToCart).toHaveBeenCalled();
    });
  });

  describe('when the product is already in the cart', () => {
    beforeEach(() => {
      cartServiceSpy.cartDetails$ = of([{
        product: MOCK_PRODUCTS[0],
        units: 1,
        unitValue: MOCK_PRODUCTS[0].price
      }]);
      mockDialogData.product = MOCK_PRODUCTS[0];
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should increase the amount of units of that product in the cart', () => {
      component.onClickIncreaseProductQuantity();
      expect(cartServiceSpy.increaseProductUnits).toHaveBeenCalled();
    });

    it('should decrease the amount of units of that product in the cart', () => {
      component.onClickDecreaseProductQuantity();
      expect(cartServiceSpy.decreaseProductUnits).toHaveBeenCalled();
    });
  });
});

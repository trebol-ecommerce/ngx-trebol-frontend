/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { SellDetail } from 'src/models/entities/SellDetail';
import { API_INJECTION_TOKENS } from '../api/api-injection-tokens';
import { ICheckoutPublicApiService } from '../api/checkout-public-api.iservice';
import { MOCK_PRODUCTS } from '../api/local-memory/mock/mock-products.datasource';
import { StoreCartService } from './store-cart.service';

describe('StoreCartService', () => {
  let service: StoreCartService;
  let mockCheckoutApiService: Partial<ICheckoutPublicApiService>;
  const mockProduct = MOCK_PRODUCTS[0];
  const mockProductTwo = MOCK_PRODUCTS[1];

  beforeEach(() => {
    // TODO use jasmine.SpyObj
    mockCheckoutApiService = {
      submitCart() { return of(void 0); }
    };

    TestBed.configureTestingModule({
      providers: [
        StoreCartService,
        { provide: API_INJECTION_TOKENS.checkout, useValue: mockCheckoutApiService }
      ]
    });
    service = TestBed.inject(StoreCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store items in the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails.length).toBe(2);
        expect(sellDetails[0].product).toEqual(mockProduct);
        expect(sellDetails[0].units).toBe(1);
        expect(sellDetails[1].product).toEqual(mockProductTwo);
        expect(sellDetails[1].units).toBe(1);
      }
    );
  });

  it('should delete items from the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    service.removeProductFromCart(1);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails.length).toBe(1);
        expect(sellDetails[0].product).toEqual(mockProduct);
      }
    );

    service.addProductToCart(mockProduct);
    service.reset();
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails.length).toBe(0);
      }
    );
  });

  it('should increase and decrease units of an individual item in the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    service.increaseProductUnits(1);
    service.increaseProductUnits(1);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails[1].units).toBe(3);
      }
    );

    service.decreaseProductUnits(1);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails[1].units).toBe(2);
      }
    );
  });

  it('should update items quantity as the items in the cart vary', () => {
    let cartItemCount: number;
    const sub = service.cartItemCount$.subscribe(q => { cartItemCount = q; });
    expect(cartItemCount).toBe(0);
    service.addProductToCart(mockProduct);
    expect(cartItemCount).toBe(1);
    service.addProductToCart(mockProductTwo);
    expect(cartItemCount).toBe(2);
    service.increaseProductUnits(0);
    service.increaseProductUnits(0);
    service.increaseProductUnits(1);
    expect(cartItemCount).toBe(5);
    service.removeProductFromCart(1);
    expect(cartItemCount).toBe(3);
    service.decreaseProductUnits(0);
    service.decreaseProductUnits(0);
    expect(cartItemCount).toBe(1);
    service.reset();
    expect(cartItemCount).toBe(0);
    sub.unsubscribe();
  });

  it('should not store items with duplicate ids, but increase the current quantity', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProduct);
    service.cartDetails$.pipe(take(1)).subscribe(
      (sellDetails: SellDetail[]) => {
        expect(sellDetails.length).toBe(1);
        expect(sellDetails[0].product).toEqual(mockProduct);
        expect(sellDetails[0].units).toBe(2);
      }
    );
  });

});

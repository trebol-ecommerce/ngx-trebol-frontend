/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderDetail } from 'src/models/entities/OrderDetail';
import { API_INJECTION_TOKENS } from '../api/api-injection-tokens';
import { ICheckoutPublicApiService } from '../api/checkout-public-api.iservice';
import { MOCK_PRODUCTS } from '../api/local-memory/mock-data/mock-products.datasource';
import { StoreCartService } from './store-cart.service';

describe('StoreCartService', () => {
  let service: StoreCartService;
  let checkoutApiServiceSpy: jasmine.SpyObj<ICheckoutPublicApiService>;
  let cartDetails: OrderDetail[];
  let updateArraySub: Subscription;
  const mockProduct = MOCK_PRODUCTS[0];
  const mockProductTwo = MOCK_PRODUCTS[1];

  beforeEach(() => {
    const mockCheckoutApiService = jasmine.createSpyObj('ICheckoutPublicApiService', ['submitCart']);

    TestBed.configureTestingModule({
      providers: [
        StoreCartService,
        { provide: API_INJECTION_TOKENS.checkout, useValue: mockCheckoutApiService }
      ]
    });
    checkoutApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.checkout) as jasmine.SpyObj<ICheckoutPublicApiService>;
    checkoutApiServiceSpy.submitCart.and.returnValue(of(void 0));

    service = TestBed.inject(StoreCartService);
  });

  beforeEach(() => {
    updateArraySub = service.cartDetails$.pipe(
      tap(s => { cartDetails = s; })
    ).subscribe();
  })

  afterEach(() => {
    updateArraySub.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store items in the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    expect(cartDetails.length).toBe(2);
    expect(cartDetails[0].product).toEqual(mockProduct);
    expect(cartDetails[0].units).toBe(1);
    expect(cartDetails[1].product).toEqual(mockProductTwo);
    expect(cartDetails[1].units).toBe(1);
  });

  it('should delete items from the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    service.removeProductFromCart(1);
    expect(cartDetails.length).toBe(1);
    expect(cartDetails[0].product).toEqual(mockProduct);
    expect(() => cartDetails[1].product).toThrowError();
    service.addProductToCart(mockProduct);
    service.reset();
    expect(cartDetails.length).toBe(0),
    expect(() => cartDetails[0].product).toThrowError();
    updateArraySub.unsubscribe();
  });

  it('should increase and decrease units of an individual item in the cart', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProductTwo);
    service.increaseProductUnits(1);
    service.increaseProductUnits(1);
    expect(cartDetails[1].units).toBe(3);
    service.decreaseProductUnits(1);
    expect(cartDetails[1].units).toBe(2);
    updateArraySub.unsubscribe();
  });

  it('should update items quantity as the items in the cart vary', () => {
    let cartItemCount: number;
    const updateItemCountSub = service.cartItemCount$.pipe(
      tap(q => { cartItemCount = q; })
    ).subscribe();
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
    updateItemCountSub.unsubscribe();
  });

  it('should not store items with duplicate ids, but add to the amount', () => {
    service.addProductToCart(mockProduct);
    service.addProductToCart(mockProduct);
    expect(cartDetails.length).toBe(1);
    expect(cartDetails[0].product).toEqual(mockProduct);
    expect(cartDetails[0].units).toBe(2);
  });

});

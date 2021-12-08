/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { BILLING_TYPE_INDIVIDUAL, BILLING_TYPE_NAMES_MAP } from 'src/text/billing-type-names';
import { API_SERVICE_INJECTION_TOKENS } from '../api/api-service-injection-tokens';
import { ICheckoutPublicApiService } from '../api/checkout-public-api.iservice';
import { MOCK_PRODUCTS } from '../api/local-memory/mock/mock-products.datasource';
import { CheckoutRequest } from '../models/CheckoutRequest';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;
  let mockCheckoutApiService: Partial<ICheckoutPublicApiService>;
  let apiSubmitCartSpy: jasmine.Spy;
  const mockProduct = MOCK_PRODUCTS[0];
  const mockProductTwo = MOCK_PRODUCTS[1];

  beforeEach(() => {
    mockCheckoutApiService = {
      submitCart() { return of(void 0); }
    };
    apiSubmitCartSpy = spyOn(mockCheckoutApiService, 'submitCart').and.callThrough();

    TestBed.configureTestingModule({
      imports: [
        LocalMemoryApiModule,
        HttpClientTestingModule
      ],
      providers: [
        StoreService,
        { provide: API_SERVICE_INJECTION_TOKENS.checkout, useValue: mockCheckoutApiService }
      ]
    });
    service = TestBed.inject(StoreService);
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

  it('should fail requesting a checkout page when data is not filled', () => {
    service.requestPayment().pipe(
      catchError(err => of(null))
    ).subscribe(result => {
      expect(result).toBe(null);
    });
  });

  it('should request a checkout page when data has been correctly filled', () => {
    service.checkoutRequestData = new CheckoutRequest();
    service.checkoutRequestData.billing = { sellType: BILLING_TYPE_NAMES_MAP.get(BILLING_TYPE_INDIVIDUAL) };
    service.checkoutRequestData.shipping = { requestShipping: false };
    service.requestPayment().pipe(
      finalize(() => {
        expect(apiSubmitCartSpy).toHaveBeenCalled();
      })
    ).subscribe();
  });

});

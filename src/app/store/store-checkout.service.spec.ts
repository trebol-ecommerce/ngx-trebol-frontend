/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Person } from 'src/models/entities/Person';
import { SellDetail } from 'src/models/entities/SellDetail';
import { BILLING_TYPE_INDIVIDUAL, BILLING_TYPE_NAMES_MAP } from 'src/text/billing-type-names';
import { CheckoutRequest } from '../../models/CheckoutRequest';
import { API_INJECTION_TOKENS } from '../api/api-injection-tokens';
import { ICheckoutPublicApiService } from '../api/checkout-public-api.iservice';
import { MOCK_PRODUCTS } from '../api/local-memory/mock/mock-products.datasource';
import { StoreCheckoutService } from './store-checkout.service';

describe('StoreCheckoutService', () => {
  let service: StoreCheckoutService;
  let mockCheckoutApiService: Partial<ICheckoutPublicApiService>;
  let apiSubmitCartSpy: jasmine.Spy;

  beforeEach(() => {
    // TODO use jasmine.SpyObj
    mockCheckoutApiService = {
      submitCart() { return of(void 0); }
    };
    apiSubmitCartSpy = spyOn(mockCheckoutApiService, 'submitCart').and.callThrough();

    TestBed.configureTestingModule({
      providers: [
        StoreCheckoutService,
        { provide: API_INJECTION_TOKENS.checkout, useValue: mockCheckoutApiService }
      ]
    });
    service = TestBed.inject(StoreCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail requesting a checkout page when data is not filled', () => {
    const requestData: CheckoutRequest = {
      billing: {
        typeName: 'Bill'
      },
      customer: {
        idNumber: '1',
        firstName: 'first name',
        lastName: 'last name',
        email: 'test@example.com',
        phone1: '',
        phone2: ''
      },
      shipping: {
        included: false
      }
    };
    const details: SellDetail[] = [];
    const expectedResult = undefined;
    service.requestTransaction(requestData, details).pipe(
      catchError(err => of(expectedResult))
    ).subscribe(result => {
      expect(result).toBe(expectedResult);
    });
  });

  it('should request a checkout page when data has been correctly filled', () => {
    const checkoutRequestData: CheckoutRequest = {
      billing: { typeName: BILLING_TYPE_NAMES_MAP.get(BILLING_TYPE_INDIVIDUAL) },
      shipping: { included: false },
      customer: new Person()
    };
    const details: SellDetail[] = [
      { product: MOCK_PRODUCTS[0], units: 1 }
    ];
    service.requestTransaction(checkoutRequestData, details).pipe(
      finalize(() => {
        expect(apiSubmitCartSpy).toHaveBeenCalled();
      })
    ).subscribe();
  });

});

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { finalize, onErrorResumeNext, tap } from 'rxjs/operators';
import { Person } from 'src/models/entities/Person';
import { SellDetail } from 'src/models/entities/SellDetail';
import { BILLING_TYPE_INDIVIDUAL, BILLING_TYPE_NAMES_MAP } from 'src/text/billing-type-names';
import { CheckoutRequest } from '../../models/CheckoutRequest';
import { API_INJECTION_TOKENS } from '../api/api-injection-tokens';
import { ICheckoutPublicApiService } from '../api/checkout-public-api.iservice';
import { MOCK_PRODUCTS } from '../api/local-memory/mock-data/mock-products.datasource';
import { StoreCheckoutService } from './store-checkout.service';

describe('StoreCheckoutService', () => {
  let service: StoreCheckoutService;
  let checkoutApiServiceSpy: jasmine.SpyObj<ICheckoutPublicApiService>;

  beforeEach(() => {
    const mockCheckoutApiService = jasmine.createSpyObj('ICheckoutPublicApiService', ['submitCart']);

    TestBed.configureTestingModule({
      providers: [
        StoreCheckoutService,
        { provide: API_INJECTION_TOKENS.checkout, useValue: mockCheckoutApiService }
      ]
    });
    checkoutApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.checkout) as jasmine.SpyObj<ICheckoutPublicApiService>;
    checkoutApiServiceSpy.submitCart.and.returnValue(of(void 0));

    service = TestBed.inject(StoreCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO fix this test suite
  xit('should fail requesting a checkout page when data is not filled', () => {
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
    service.requestTransaction(requestData, details).pipe(
      tap(
        () => fail('the API should have thrown an error'),
        err => expect(err).toBeTruthy()
      ),
      onErrorResumeNext()
    ).subscribe();
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
        expect(checkoutApiServiceSpy.submitCart).toHaveBeenCalled();
      })
    ).subscribe();
  });

});

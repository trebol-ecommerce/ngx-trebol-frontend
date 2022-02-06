/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from '../api/api-service-injection-tokens';
import { ICheckoutPublicApiService } from '../api/checkout-public-api.iservice';
import { StoreSearchService } from './store-search.service';

describe('StoreSearchService', () => {
  let service: StoreSearchService;
  let mockCheckoutApiService: Partial<ICheckoutPublicApiService>;

  beforeEach(() => {
    mockCheckoutApiService = {
      submitCart() { return of(void 0); }
    };

    TestBed.configureTestingModule({
      providers: [
        StoreSearchService,
        { provide: API_SERVICE_INJECTION_TOKENS.checkout, useValue: mockCheckoutApiService }
      ]
    });
    service = TestBed.inject(StoreSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

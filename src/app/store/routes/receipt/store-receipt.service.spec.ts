/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IReceiptPublicApiService } from 'src/app/api/receipt-public-api.iservice';
import { StoreReceiptService } from './store-receipt.service';

describe('StoreReceiptService', () => {
  let service: StoreReceiptService;
  let mockReceiptApiService: Partial<IReceiptPublicApiService>;

  beforeEach(() => {
    mockReceiptApiService = {
      fetchTransactionReceiptByToken() { return EMPTY; }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        StoreReceiptService,
        { provide: API_SERVICE_INJECTION_TOKENS.receipt, useValue: mockReceiptApiService }
      ]
    });
    service = TestBed.inject(StoreReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

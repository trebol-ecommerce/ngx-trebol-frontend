// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { API_SERVICE_INJECTION_TOKENS } from '../../api-service-injection-tokens';
import { ICheckoutPublicApiService } from '../../checkout-public-api.iservice';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';
import { MOCK_EXTERNAL_PAYMENT_REDIRECT_DATA } from '../mock/mock-external-payment-redirect-data.examples';

@Injectable()
export class CheckoutPublicLocalMemoryApiService
  implements ICheckoutPublicApiService {

  protected items: Product[] = [];

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) private dataService: TransactionalEntityDataLocalMemoryApiService<Product>
  ) {
    this.dataService.fetchPage().subscribe(response => {
      this.items = response.items;
    });
  }

  submitCart(): Observable<ExternalPaymentRedirectionData> {
    return of(MOCK_EXTERNAL_PAYMENT_REDIRECT_DATA);
  }
}

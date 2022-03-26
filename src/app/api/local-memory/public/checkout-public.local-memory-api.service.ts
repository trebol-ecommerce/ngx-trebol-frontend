/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';
import { MOCK_EXTERNAL_PAYMENT_REDIRECT_DATA } from '../mock/mock-external-payment-redirect-data.examples';
import { ICheckoutPublicApiService } from '../../checkout-public-api.iservice';

@Injectable()
export class CheckoutPublicLocalMemoryApiService
  implements ICheckoutPublicApiService {

  constructor() { }

  submitCart(): Observable<ExternalPaymentRedirectionData> {
    return of(MOCK_EXTERNAL_PAYMENT_REDIRECT_DATA);
  }
}

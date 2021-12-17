/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';
import { Sell } from '../../models/entities/Sell';

export interface ICheckoutPublicApiService {
  submitCart(details: Sell): Observable<ExternalPaymentRedirectionData>;
}

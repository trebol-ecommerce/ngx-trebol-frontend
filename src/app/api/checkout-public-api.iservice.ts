/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';
import { Order } from '../../models/entities/Order';

export interface ICheckoutPublicApiService {
  submitCart(details: Order): Observable<ExternalPaymentRedirectionData>;
}

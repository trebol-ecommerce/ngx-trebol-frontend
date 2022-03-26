/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Address } from './entities/Address';
import { BillingDetails } from './BillingDetails';
import { Person } from './entities/Person';

export class CheckoutRequest {
  billing: BillingDetails;
  customer: Person;
  shipping: {
    requestShipping: boolean;
    shippingAddress?: Address;
  };
}

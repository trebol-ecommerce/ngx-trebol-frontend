/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Person } from './entities/Person';
import { ShippingDetails } from './ShippingDetails';
import { BillingDetails } from './BillingDetails';

export class CheckoutRequest {
  billing = new BillingDetails();
  customer = new Person();
  shipping = new ShippingDetails();
}

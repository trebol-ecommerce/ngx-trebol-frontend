/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Address } from './entities/Address';
import { Person } from './entities/Person';
import { BillingCompany } from './entities/BillingCompany';

interface Shipping {
  included: boolean;
  address?: Address;
}

interface Billing {
  typeName: string;
  company?: BillingCompany;
  address?: Address;
}

export class CheckoutRequest {
  billing: Billing;
  customer: Person;
  shipping: Shipping;
}

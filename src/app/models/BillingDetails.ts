/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Address } from './entities/Address';
import { BillingCompany } from './entities/BillingCompany';

export class BillingDetails {
  sellType: string;
  company?: BillingCompany;
  address?: Address;
}

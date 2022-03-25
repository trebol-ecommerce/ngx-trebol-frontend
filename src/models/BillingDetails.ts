/*
 * Copyright (c) 2022 The Trebol eCommerce Project
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

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Address } from './Address';
import { BillingCompany } from './BillingCompany';
import { Customer } from './Customer';
import { Salesperson } from './Salesperson';
import { SellDetail } from './SellDetail';

export class Sell {
  buyOrder?: number;
  details: SellDetail[];
  date?: Date;
  billingType: string;
  billingCompany?: BillingCompany;
  paymentType: string;
  customer: Customer;
  netValue?: number;
  salesperson?: Salesperson;
  status?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
}

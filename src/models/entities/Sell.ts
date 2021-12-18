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
import { Shipper } from './Shipper';

export class Sell {
  billingAddress?: Address;
  billingCompany?: BillingCompany;
  billingType: string;
  buyOrder?: number;
  customer: Customer;
  date?: Date;
  details: SellDetail[];
  netValue?: number;
  paymentType: string;
  salesperson?: Salesperson;
  shipper?: Shipper;
  shippingAddress?: Address;
  status?: string;
  taxValue?: number;
  token?: number;
  totalItems?: number;
  totalValue?: number;
  transportValue?: number;
}

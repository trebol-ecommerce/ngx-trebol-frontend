/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Address } from './Address';
import { BillingCompany } from './BillingCompany';
import { Person } from './Person';
import { SellDetail } from './SellDetail';
import { Shipper } from './Shipper';

export class Sell {
  billingAddress?: Address;
  billingCompany?: BillingCompany;
  billingType: string;
  buyOrder?: number;
  customer: Person;
  date?: Date;
  details: SellDetail[];
  netValue?: number;
  paymentType: string;
  salesperson?: Person;
  shipper?: Shipper;
  shippingAddress?: Address;
  status?: string;
  taxValue?: number;
  token?: string;
  totalItems?: number;
  totalValue?: number;
  transportValue?: number;
}

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Address } from './Address';
import { BillingCompany } from './BillingCompany';
import { Person } from './Person';
import { OrderDetail } from './OrderDetail';
import { Shipper } from './Shipper';

export class Order {
  billingAddress?: Address;
  billingCompany?: BillingCompany;
  billingType: string;
  buyOrder?: number;
  customer: Person;
  date?: Date;
  details: OrderDetail[];
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

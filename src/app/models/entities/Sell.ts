// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Customer } from './Customer';
import { Salesperson } from './Salesperson';
import { SellDetail } from './SellDetail';
import { Address } from './Address';
import { BillingCompany } from './BillingCompany';

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

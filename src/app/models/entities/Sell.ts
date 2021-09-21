// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Customer } from './Customer';
import { Salesperson } from './Salesperson';
import { SellDetail } from './SellDetail';
import { Address } from './Address';

export class Sell {
  buyOrder: number;
  details: SellDetail[];
  date: Date;
  billingType: string;
  paymentType: string;
  customer: Partial<Customer>;
  netValue?: number;
  salesperson?: Partial<Salesperson>;
  status?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
}

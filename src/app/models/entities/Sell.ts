// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Customer } from './Customer';
import { Salesperson } from './Salesperson';
import { SellDetail } from './SellDetail';
import { BillingType } from './BillingType';

export class Sell {
  public id: number;
  public details: SellDetail[];
  public type: Partial<BillingType>;
  public soldOn: string;
  public customer: Partial<Customer>;

  public subtotalValue?: number;
  public salesperson?: Partial<Salesperson>;
}

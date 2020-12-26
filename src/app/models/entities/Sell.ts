// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from 'src/app/models/AbstractEntity';
import { Customer } from './Customer';
import { Seller } from './Seller';
import { SellDetail } from './SellDetail';
import { SellType } from './SellType';

export class Sell
  extends AbstractEntity {

  public id: number;
  public details: SellDetail[];
  public type: Partial<SellType>;
  public soldOn: string;
  public customer: Partial<Customer>;

  public subtotalValue?: number;
  public seller?: Partial<Seller>;
}

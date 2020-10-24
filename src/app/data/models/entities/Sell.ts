// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from '../AbstractEntity';
import { Client } from './Client';
import { Seller } from './Seller';
import { SellDetail } from './SellDetail';
import { SellType } from './SellType';

export class Sell
  extends AbstractEntity {

  public id: number;
  public details: SellDetail[];
  public type: Partial<SellType>;
  public soldOn: string;
  public client: Partial<Client>;

  public subtotalValue?: number;
  public seller?: Partial<Seller>;
}

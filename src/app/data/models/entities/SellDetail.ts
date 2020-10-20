// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from '../AbstractEntity';
import { Product } from './Product';

export class SellDetail
  extends AbstractEntity {

  public id: number;
  public product: Partial<Product>;
  public units: number;
  public sellId?: number;
}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Product } from './Product';

export class SellDetail {
  public product: Partial<Product>;
  public units: number;
  public sellId?: number;
}

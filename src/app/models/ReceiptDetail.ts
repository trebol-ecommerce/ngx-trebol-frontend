// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Product } from './entities/Product';

export class ReceiptDetail {

  public product: Partial<Product>;
  public units: number;
}

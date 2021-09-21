// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Product } from './Product';

export class SellDetail {
  product: Partial<Product>;
  units: number;
}

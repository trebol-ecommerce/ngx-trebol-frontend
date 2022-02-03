/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Product } from './Product';

export class SellDetail {
  product: Partial<Product>;
  units: number;
  unitValue?: number;
}

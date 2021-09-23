/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Product } from './entities/Product';

export class ReceiptDetail {
  product: Partial<Product>;
  units: number;
}

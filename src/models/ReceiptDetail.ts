/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Product } from './entities/Product';

export class ReceiptDetail {
  product: Partial<Product>;
  units: number;
  unitValue?: number;
}

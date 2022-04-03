/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Image } from './Image';
import { ProductCategory } from './ProductCategory';

export class Product {
  name: string;
  barcode: string;
  price: number;
  category: Partial<ProductCategory>;
  description?: string;
  // currentStock?: number;
  // criticalStock?: number;
  images?: Image[];
}

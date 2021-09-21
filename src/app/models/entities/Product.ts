// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ProductCategory } from './ProductCategory';
import { Image } from './Image';

// TODO update this model

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

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';
import { MOCK_PRODUCTS } from './mock-products.datasource';

export const MOCK_PRODUCT_LISTS: ProductList[] = [
  { code: 'OFERTAS', name: 'Ofertas ejemplo', totalCount: 3 }
];

export const MOCK_PRODUCT_LIST_CONTENTS_MAP = new Map<string, Product[]>([
  [
    'OFERTAS',
    [
      MOCK_PRODUCTS[0],
      MOCK_PRODUCTS[1],
      MOCK_PRODUCTS[2]
    ]
  ]
]);

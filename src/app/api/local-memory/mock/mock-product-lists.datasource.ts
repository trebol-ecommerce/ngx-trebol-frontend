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
  { code: 'OnSale1', name: 'Example sale 1', totalCount: 9 },
  { code: 'OnSale2', name: 'Example sale 2', totalCount: 3 },
  { code: 'OnSale3', name: 'Example sale 3', totalCount: 7 },
  { code: 'OnSale4', name: 'Example sale 4', totalCount: 8 },
  { code: 'OnSale5', name: 'Example sale 5', totalCount: 4 },
  { code: 'OnSale6', name: 'Example sale 6', totalCount: 4 }
];

export const MOCK_PRODUCT_LIST_CONTENTS_MAP = new Map<string, Set<Product>>([
  [
    'OnSale1',
    new Set([
      MOCK_PRODUCTS[0],
      MOCK_PRODUCTS[1],
      MOCK_PRODUCTS[2],
      MOCK_PRODUCTS[3],
      MOCK_PRODUCTS[4],
      MOCK_PRODUCTS[5],
      MOCK_PRODUCTS[6],
      MOCK_PRODUCTS[7],
      MOCK_PRODUCTS[8]
    ])
  ],
  [
    'OnSale2',
    new Set([
      MOCK_PRODUCTS[9],
      MOCK_PRODUCTS[10],
      MOCK_PRODUCTS[11]
    ])
  ],
  [
    'OnSale3',
    new Set([
      MOCK_PRODUCTS[12],
      MOCK_PRODUCTS[13],
      MOCK_PRODUCTS[14],
      MOCK_PRODUCTS[15],
      MOCK_PRODUCTS[16],
      MOCK_PRODUCTS[17],
      MOCK_PRODUCTS[18]
    ])
  ],
  [
    'OnSale4',
    new Set([
      MOCK_PRODUCTS[19],
      MOCK_PRODUCTS[20],
      MOCK_PRODUCTS[21],
      MOCK_PRODUCTS[22],
      MOCK_PRODUCTS[23],
      MOCK_PRODUCTS[24],
      MOCK_PRODUCTS[25],
      MOCK_PRODUCTS[26]
    ])
  ],
  [
    'OnSale5',
    new Set([
      MOCK_PRODUCTS[27],
      MOCK_PRODUCTS[28],
      MOCK_PRODUCTS[29],
      MOCK_PRODUCTS[30]
    ])
  ],
  [
    'OnSale6',
    new Set([
      MOCK_PRODUCTS[31],
      MOCK_PRODUCTS[32],
      MOCK_PRODUCTS[33],
      MOCK_PRODUCTS[34]
    ])
  ]
]);

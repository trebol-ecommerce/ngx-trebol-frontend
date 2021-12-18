/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Product } from 'src/models/entities/Product';
import { MOCK_PRODUCT_CATEGORIES } from './mock-product-categories.datasource';

export const MOCK_PRODUCTS: Product[] = [
  {
    name: 'Zapatillas Nike Air Jordan Azul/Negro',
    barcode: 'NIKE-AZLNGR-1',
    price: 14990,
    // currentStock: 40,
    // criticalStock: 5,
    category: MOCK_PRODUCT_CATEGORIES[0],
    images: [
      {
        filename: 'photo-1578116922645-3976907a7671.jpg',
        url: 'assets/img/products/photo-1578116922645-3976907a7671.jpg'
      }
    ]
  },
  {
    name: 'Zapatillas Nike Hi-Top Rojo/Negro',
    barcode: 'NIKE-ROJNGR-1',
    price: 14990,
    // currentStock: 20,
    // criticalStock: 5,
    category: MOCK_PRODUCT_CATEGORIES[0],
    images: [
      {
        filename: 'photo-1578172433613-9f1b258f7d5b.jpg',
        url: 'assets/img/products/photo-1578172433613-9f1b258f7d5b.jpg'
      }
    ]
  },
  {
    name: 'Zapatillas Nike Hi-Top Rojo/Blanco',
    barcode: 'NIKE-ROJBCO-1',
    price: 13990,
    // currentStock: 60,
    // criticalStock: 5,
    category: MOCK_PRODUCT_CATEGORIES[0],
    images: [
      {
        filename: 'photo-1580143881495-b21dde95fc60.jpg',
        url: 'assets/img/products/photo-1580143881495-b21dde95fc60.jpg'
      }
    ]
  }
];

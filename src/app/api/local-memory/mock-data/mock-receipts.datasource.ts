/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Receipt } from "src/models/Receipt";
import { MOCK_PRODUCTS } from "./mock-products.datasource";
import { MOCK_ORDER_STATUSES } from "./mock-order-statuses.datasource";

export const MOCK_RECEIPTS: Receipt[] = [
  {
    buyOrder: 1,
    date: '2021-06-16',
    details: [
      { product: MOCK_PRODUCTS[0], units: 4, unitValue: MOCK_PRODUCTS[0].price },
      { product: MOCK_PRODUCTS[1], units: 1, unitValue: MOCK_PRODUCTS[1].price },
    ],
    taxValue: 12000,
    transportValue: 5000,
    status: MOCK_ORDER_STATUSES.delivered,
    totalItems: 5,
    totalValue: ( 5000 + 12000 +
      (MOCK_PRODUCTS[0].price * 4) +
      MOCK_PRODUCTS[1].price
    ),
    token: 'I6EqPVxQjqt0ZExl4vvnEYEq3q1Mnqi'
  },
  {
    buyOrder: 2,
    date: '2021-06-18',
    details: [
      { product: MOCK_PRODUCTS[0], units: 2, unitValue: MOCK_PRODUCTS[0].price }
    ],
    taxValue: 8000,
    transportValue: 3000,
    status: MOCK_ORDER_STATUSES.delivered,
    totalItems: 2,
    totalValue: ( 3000 + 8000 +
      (MOCK_PRODUCTS[0].price * 2)
    ),
    token: 'KuwfOAe5sayZHMOar5.5yb6RyahwdUW'
  },
  {
    buyOrder: 3,
    date: '2021-06-18',
    details: [
      { product: MOCK_PRODUCTS[1], units: 1, unitValue: MOCK_PRODUCTS[1].price },
    ],
    taxValue: 6000,
    transportValue: 3000,
    status: MOCK_ORDER_STATUSES.deliveryCancelled,
    totalItems: 1,
    totalValue: ( 3000 + 6000 +
      MOCK_PRODUCTS[1].price
    ),
    token: 'uDq8.SvZ4.cTbKLAkVFHJZy0cYiyKjW'
  },
  {
    buyOrder: 4,
    date: '2021-06-22',
    details: [
      { product: MOCK_PRODUCTS[0], units: 2, unitValue: MOCK_PRODUCTS[0].price },
    ],
    taxValue: 6000,
    transportValue: 3000,
    status: MOCK_ORDER_STATUSES.unpaid,
    totalItems: 2,
    totalValue: ( 3000 + 6000 +
      (MOCK_PRODUCTS[0].price * 2)
    ),
    token: 'lNeY5IlPL4dHC4XzdzjmK5I.4IvjnZC'
  },
  {
    buyOrder: 5,
    date: '2021-07-03',
    details: [
      { product: MOCK_PRODUCTS[0], units: 1, unitValue: MOCK_PRODUCTS[0].price },
      { product: MOCK_PRODUCTS[2], units: 1, unitValue: MOCK_PRODUCTS[2].price },
    ],
    taxValue: 6000,
    transportValue: 3000,
    status: MOCK_ORDER_STATUSES.failed,
    totalItems: 2,
    totalValue: ( 3000 + 6000 +
      MOCK_PRODUCTS[0].price +
      MOCK_PRODUCTS[2].price
    ),
    token: '3Db3oTVDoriYx8J//Ul52aDcGX1JxF.'
  }

];

import { Receipt } from "src/app/models/Receipt";
import { MOCK_PRODUCTS } from "./mock-products.datasource";
import { MOCK_SELL_STATUSES } from "./mock-sell-statuses.datasource";

const MOCK_PRODUCT_UNIT_VALUES = [
  12990,
  14990
];

export const MOCK_RECEIPTS: Receipt[] = [
  {
    buyOrder: 1,
    date: '2021-06-16',
    details: [
      { product: MOCK_PRODUCTS[0], units: 4, unitValue: MOCK_PRODUCT_UNIT_VALUES[0] },
      { product: MOCK_PRODUCTS[1], units: 1, unitValue: MOCK_PRODUCT_UNIT_VALUES[1] },
    ],
    taxValue: 12000,
    transportValue: 5000,
    status: MOCK_SELL_STATUSES.delivered,
    totalItems: 5,
    totalValue: ( 5000 + 12000 +
      (MOCK_PRODUCT_UNIT_VALUES[0] * 4) +
      MOCK_PRODUCT_UNIT_VALUES[1]
    ),
    token: 'I6EqPVxQjqt0ZExl4vvnEYEq3q1Mnqi'
  },
  {
    buyOrder: 2,
    date: '2021-06-18',
    details: [
      { product: MOCK_PRODUCTS[0], units: 2, unitValue: MOCK_PRODUCT_UNIT_VALUES[0] }
    ],
    taxValue: 8000,
    transportValue: 3000,
    status: MOCK_SELL_STATUSES.delivered,
    totalItems: 2,
    totalValue: ( 3000 + 8000 +
      (MOCK_PRODUCT_UNIT_VALUES[0] * 2)
    ),
    token: 'KuwfOAe5sayZHMOar5.5yb6RyahwdUW'
  },
  {
    buyOrder: 3,
    date: '2021-06-18',
    details: [
      { product: MOCK_PRODUCTS[1], units: 1, unitValue: MOCK_PRODUCT_UNIT_VALUES[1] },
    ],
    taxValue: 6000,
    transportValue: 3000,
    status: MOCK_SELL_STATUSES.deliveryCancelled,
    totalItems: 1,
    totalValue: ( 3000 + 6000 +
      MOCK_PRODUCT_UNIT_VALUES[1]
    ),
    token: 'uDq8.SvZ4.cTbKLAkVFHJZy0cYiyKjW'
  },
  {
    buyOrder: 4,
    date: '2021-06-22',
    details: [
      { product: MOCK_PRODUCTS[0], units: 2, unitValue: MOCK_PRODUCT_UNIT_VALUES[0] },
    ],
    taxValue: 6000,
    transportValue: 3000,
    status: MOCK_SELL_STATUSES.unpaid,
    totalItems: 2,
    totalValue: ( 3000 + 6000 +
      (MOCK_PRODUCT_UNIT_VALUES[0] * 2)
    ),
    token: 'lNeY5IlPL4dHC4XzdzjmK5I.4IvjnZC'
  },
  {
    buyOrder: 5,
    date: '2021-07-03',
    details: [
      { product: MOCK_PRODUCTS[0], units: 1, unitValue: MOCK_PRODUCT_UNIT_VALUES[0] },
      { product: MOCK_PRODUCTS[2], units: 1, unitValue: MOCK_PRODUCT_UNIT_VALUES[2] },
    ],
    taxValue: 6000,
    transportValue: 3000,
    status: MOCK_SELL_STATUSES.failed,
    totalItems: 2,
    totalValue: ( 3000 + 6000 +
      MOCK_PRODUCT_UNIT_VALUES[0] +
      MOCK_PRODUCT_UNIT_VALUES[2]
    ),
    token: '3Db3oTVDoriYx8J//Ul52aDcGX1JxF.'
  }

];

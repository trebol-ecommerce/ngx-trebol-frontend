/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Sell } from 'src/app/models/entities/Sell';
import { BILLING_TYPE_INDIVIDUAL } from 'src/text/billing-type-names';
import { MOCK_CUSTOMERS } from './mock-customers.datasource';
import { MOCK_PRODUCTS } from './mock-products.datasource';
import { MOCK_SALESPEOPLE } from './mock-salespeople.datasource';
import { MOCK_SELL_STATUSES } from './mock-sell-statuses.datasource';

export const MOCK_SALES: Sell[] = [
  {
    buyOrder: 1,
    date: new Date('2021-06-16'),
    salesperson: MOCK_SALESPEOPLE[3],
    details: [
      { product: MOCK_PRODUCTS[0], units: 4 },
      { product: MOCK_PRODUCTS[1], units: 1 },
    ],
    customer: MOCK_CUSTOMERS[1],
    paymentType: 'WebPay Plus',
    billingType: BILLING_TYPE_INDIVIDUAL,
    status: MOCK_SELL_STATUSES.delivered
  },
  {
    buyOrder: 2,
    date: new Date('2021-06-18'),
    details: [
      { product: MOCK_PRODUCTS[0], units: 2 },
    ],
    customer: MOCK_CUSTOMERS[2],
    paymentType: 'WebPay Plus',
    billingType: BILLING_TYPE_INDIVIDUAL,
    status: MOCK_SELL_STATUSES.delivered
  },
  {
    buyOrder: 3,
    date: new Date('2021-06-18'),
    salesperson: MOCK_SALESPEOPLE[2],
    details: [
      { product: MOCK_PRODUCTS[1], units: 1 },
    ],
    customer: MOCK_CUSTOMERS[0],
    paymentType: 'WebPay Plus',
    billingType: BILLING_TYPE_INDIVIDUAL,
    status: MOCK_SELL_STATUSES.deliveryCancelled
  },
  {
    buyOrder: 4,
    date: new Date('2021-06-22'),
    salesperson: MOCK_SALESPEOPLE[1],
    details: [
      { product: MOCK_PRODUCTS[0], units: 2 },
    ],
    customer: MOCK_CUSTOMERS[4],
    paymentType: 'WebPay Plus',
    billingType: BILLING_TYPE_INDIVIDUAL,
    status: MOCK_SELL_STATUSES.unpaid
  },
  {
    buyOrder: 5,
    date: new Date('2021-07-03'),
    details: [
      { product: MOCK_PRODUCTS[0], units: 1 },
      { product: MOCK_PRODUCTS[2], units: 1 },
    ],
    customer: MOCK_CUSTOMERS[3],
    paymentType: 'WebPay Plus',
    billingType: BILLING_TYPE_INDIVIDUAL,
    status: MOCK_SELL_STATUSES.failed
  }
];

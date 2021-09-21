import { Sell } from 'src/app/models/entities/Sell';
import { MOCK_PRODUCTS } from './mock-products.datasource';
import { MOCK_CUSTOMERS } from './mock-customers.datasource';
import { MOCK_SALESPEOPLE } from './mock-salespeople.datasource';

export const MOCK_SALES: Sell[] = [
  {
    buyOrder: 1,
    date: new Date('2020-06-16'),
    salesperson: MOCK_SALESPEOPLE[3],
    details: [
      { product: MOCK_PRODUCTS[0], units: 4 },
      { product: MOCK_PRODUCTS[1], units: 1 },
    ],
    customer: MOCK_CUSTOMERS[1],
    paymentType: 'WebPay Plus',
    billingType: 'Bill'
  },
  {
    buyOrder: 2,
    date: new Date('2020-06-18'),
    details: [
      { product: MOCK_PRODUCTS[0], units: 2 },
    ],
    customer: MOCK_CUSTOMERS[2],
    paymentType: 'WebPay Plus',
    billingType: 'Bill'
  },
  {
    buyOrder: 3,
    date: new Date('2020-06-18'),
    salesperson: MOCK_SALESPEOPLE[2],
    details: [
      { product: MOCK_PRODUCTS[1], units: 1 },
    ],
    customer: MOCK_CUSTOMERS[0],
    paymentType: 'WebPay Plus',
    billingType: 'Bill'
  },
  {
    buyOrder: 4,
    date: new Date('2020-06-22'),
    salesperson: MOCK_SALESPEOPLE[1],
    details: [
      { product: MOCK_PRODUCTS[0], units: 2 },
    ],
    customer: MOCK_CUSTOMERS[4],
    paymentType: 'WebPay Plus',
    billingType: 'Bill'
  },
  {
    buyOrder: 5,
    date: new Date('2020-07-03'),
    details: [
      { product: MOCK_PRODUCTS[0], units: 1 },
      { product: MOCK_PRODUCTS[2], units: 1 },
    ],
    customer: MOCK_CUSTOMERS[3],
    paymentType: 'WebPay Plus',
    billingType: 'Bill'
  }
];

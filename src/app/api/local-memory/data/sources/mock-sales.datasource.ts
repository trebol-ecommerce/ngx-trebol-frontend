import { Sell } from 'src/app/models/entities/Sell';
import { MOCK_PRODUCTS } from './mock-products.datasource';
import { MOCK_PEOPLE } from './mock-people.datasource';

export const MOCK_SALES: Partial<Sell>[] = [
  {
    id: 1,
    soldOn: '2020-06-16',
    salesperson: { person: MOCK_PEOPLE[0] },
    details: [
      { product: MOCK_PRODUCTS[0], units: 4 },
      { product: MOCK_PRODUCTS[1], units: 1 },
    ]
  },
  {
    id: 2,
    soldOn: '2020-06-18',
    salesperson: { person: MOCK_PEOPLE[1] },
    details: [
      { product: MOCK_PRODUCTS[0], units: 2 },
    ]
  },
  {
    id: 3,
    soldOn: '2020-06-18',
    salesperson: { person: MOCK_PEOPLE[2] },
    details: [
      { product: MOCK_PRODUCTS[1], units: 1 },
    ]
  },
  {
    id: 4,
    soldOn: '2020-06-22',
    salesperson: { person: MOCK_PEOPLE[3] },
    details: [
      { product: MOCK_PRODUCTS[0], units: 2 },
    ]
  },
  {
    id: 5,
    soldOn: '2020-07-03',
    salesperson: { person: MOCK_PEOPLE[4] },
    details: [
      { product: MOCK_PRODUCTS[0], units: 1 },
      { product: MOCK_PRODUCTS[2], units: 1 },
    ]
  }
];

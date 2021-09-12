import { Sell } from 'src/app/models/entities/Sell';

export const MOCK_SALES: Partial<Sell>[] = [
  {
    id: 1,
    soldOn: '2020-06-16',
    salesperson: { id: 1 },
    details: [
      { id: 1, product: { id: 1 }, units: 4 },
      { id: 2, product: { id: 2 }, units: 1 },
    ]
  },
  {
    id: 2,
    soldOn: '2020-06-18',
    salesperson: { id: 1 },
    details: [
      { id: 3, product: { id: 3 }, units: 2 },
    ]
  },
  {
    id: 3,
    soldOn: '2020-06-18',
    salesperson: { id: 1 },
    details: [
      { id: 4, product: { id: 2 }, units: 1 },
    ]
  },
  {
    id: 4,
    soldOn: '2020-06-22',
    salesperson: { id: 3 },
    details: [
      { id: 5, product: { id: 1 }, units: 2 },
    ]
  },
  {
    id: 5,
    soldOn: '2020-07-03',
    salesperson: { id: 5 },
    details: [
      { id: 6, product: { id: 1 }, units: 1 },
      { id: 7, product: { id: 3 }, units: 1 },
    ]
  }
];

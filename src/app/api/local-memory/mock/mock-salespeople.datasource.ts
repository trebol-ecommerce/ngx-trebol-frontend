/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Salesperson } from 'src/models/entities/Salesperson';
import { MOCK_PEOPLE } from './mock-people.datasource';

export const MOCK_SALESPEOPLE: Salesperson[] = [
  {
    person: MOCK_PEOPLE[4]
  },
  {
    person: MOCK_PEOPLE[5]
  },
  {
    person: MOCK_PEOPLE[6]
  },
  {
    person: MOCK_PEOPLE[7]
  },
  {
    person: MOCK_PEOPLE[8]
  }
];

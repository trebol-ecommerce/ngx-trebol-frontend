/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { User } from 'src/models/entities/User';
import { MOCK_PEOPLE } from './mock-people.datasource';

export const MOCK_USERS: User[] = [
  {
    name: 'admin',
    password: 'admin',
    person: MOCK_PEOPLE[1],
    role: 'Administrator'
  }
];

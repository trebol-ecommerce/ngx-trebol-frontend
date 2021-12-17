/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Person } from './Person';
import { Login } from '../Login';

export class User
  implements Partial<Login> {
  name: string;
  password?: string;
  person?: Partial<Person>;
  role?: string;
}

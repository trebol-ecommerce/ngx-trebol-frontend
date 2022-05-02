/*
 * Copyright (c) 2022 The Trebol eCommerce Project
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
  person: Partial<Person>;
  role: string;
}

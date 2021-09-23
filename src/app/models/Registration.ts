/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Person } from './entities/Person';

export class Registration {
  name: string;
  password: string;
  profile: Person;
}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Person } from './Person';
import { Login } from '../Login';

export class User implements Partial<Login> {
  public name: string;
  public createdOn?: string;
  public password?: string;
  public person: Partial<Person>;
  public role?: string;
}

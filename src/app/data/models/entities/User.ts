// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from '../AbstractEntity';
import { Person } from './Person';
import { Seller } from './Seller';
import { Login } from '../Login';

export class User
  implements AbstractEntity, Partial<Login> {

  public id: number;
  public name: string;
  public createdOn?: string;
  public password?: string;

  public person: Partial<Person>;
  public seller?: Seller;
  public clientId?: number;
}

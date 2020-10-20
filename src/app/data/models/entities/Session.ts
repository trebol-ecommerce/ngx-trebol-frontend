// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from '../AbstractEntity';
import { User } from './User';

export class Session
  extends AbstractEntity {

  public id: number;
  public openedOn: string;
  public hash: string;
  public user: Partial<User>;
}

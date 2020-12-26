// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from 'src/app/models/AbstractEntity';
import { Person } from './Person';

export class Salesperson
  implements AbstractEntity {

  public id: number;
  public person?: Person;
}

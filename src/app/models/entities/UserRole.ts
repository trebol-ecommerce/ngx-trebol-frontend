// Copyright (c) 2021 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from '../AbstractEntity';

export class UserRole
  implements AbstractEntity {

  public id: string | number;
  public name?: string;
  public description?: string;
}

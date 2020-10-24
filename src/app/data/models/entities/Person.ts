// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from '../AbstractEntity';

/**
 *
 */
export class Person
  implements AbstractEntity {

  public id: number;
  public name: string;
  public idCard: string;
  public email: string;
  public address: string;
  public phone1?: number;
  public phone2?: number;
}

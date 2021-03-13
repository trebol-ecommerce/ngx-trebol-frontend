/*
 * Copyright (c) 2021 Benjamin La Madrid
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AbstractEntity } from '../AbstractEntity';

export class Image
  extends AbstractEntity {

  filename: string;
  url: string;
  get id() { return this.url; }
}

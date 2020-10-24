// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from '../AbstractEntity';
import { ProductFamily } from './ProductFamily';

export class ProductType
  extends AbstractEntity {

  public id: number;
  public name: string;

  public productFamily?: Partial<ProductFamily>;
}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AbstractEntity } from 'src/app/models/AbstractEntity';
import { ProductType } from './ProductType';
import { Image } from './Image';

export class Product
  extends AbstractEntity {

  public id: number;
  public name: string;
  public barcode: string;
  public price: number;
  public productType: Partial<ProductType>;

  public description?: string;
  public currentStock?: number;
  public criticalStock?: number;
  public images?: Image[];
}

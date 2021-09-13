// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export class ProductCategory {

  public code: string;
  public name: string;

  public parent?: Partial<ProductCategory>;
}

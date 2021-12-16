/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export class ProductCategory {
  code: string;
  name: string;
  parent?: Partial<ProductCategory>;
  children?: ProductCategory[];
}

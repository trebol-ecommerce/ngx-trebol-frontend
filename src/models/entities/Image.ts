/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export class Image{
  filename: string;
  url: string;
  code?: string;
  file?: File; // TODO refactor this out
  targetUrl?: string;
}

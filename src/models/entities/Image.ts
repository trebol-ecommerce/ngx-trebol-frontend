/*
 * Copyright (c) 2022 The Trebol eCommerce Project
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

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Image } from 'src/models/entities/Image';

export class ImageArrayOption {
  image: Image;
  selected: boolean;
  disabled: boolean;
}

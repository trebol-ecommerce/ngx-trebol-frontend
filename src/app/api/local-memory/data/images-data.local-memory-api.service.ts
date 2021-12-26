/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Image } from 'src/models/entities/Image';
import { MOCK_IMAGES } from '../mock/mock-images.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class ImagesDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Image> {

  protected items = MOCK_IMAGES.slice();

  constructor() {
    super();
  }

  protected itemExists(image: Partial<Image>) {
    return this.items.some(image2 => (image.code === image2.code));
  }

  protected getIndexOfItem(image: Partial<Image>) {
    return this.items.findIndex(image2 => (image.code === image2.code));
  }
}

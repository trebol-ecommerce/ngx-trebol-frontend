// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/entities/Image';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_IMAGES } from '../mock/mock-images.datasource';

@Injectable()
export class ImagesDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Image> {

  protected items: Image[] = MOCK_IMAGES.map(n => Object.assign(new Image(), n));

  constructor() {
    super();
  }

  protected itemExists(image: Partial<Image>) {
    return this.items.some(image2 => (image.filename === image2.filename));
  }

  protected getIndexOfItem(image: Partial<Image>) {
    return this.items.findIndex(image2 => (image.filename === image2.filename));
  }
}

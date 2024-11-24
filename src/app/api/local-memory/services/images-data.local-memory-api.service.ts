/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Image } from 'src/models/entities/Image';
import { matchesStringProperty, matchesNumberProperty, matchesDateProperty, matchesIdProperty } from '../local-memory-api.functions';
import { MOCK_IMAGES } from '../mock-data/mock-images.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class ImagesDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Image> {

  protected items = MOCK_IMAGES.slice();

  constructor() {
    super();
  }

  protected filterItems(filter: any): Image[] {
    let matchingItems = this.items;
    for (const propName in filter) {
      if (filter.hasOwnProperty(propName)) {
        const propValue = filter[propName];
         if (propName === 'filenameLike') {
          const filenameRegexp = new RegExp(`^.*${propValue}.*$`);
          matchingItems = matchingItems.filter(c => filenameRegexp.test(c.filename));
        } else if (propName === 'codeLike') {
          const codeRegexp = new RegExp(`^.*${propValue}.*$`);
          matchingItems = matchingItems.filter(c => (!!c.code && codeRegexp.test(c.code)));
        } else if (propName !== 'id') {
          if (typeof propValue === 'string') {
            matchingItems = matchingItems.filter(it => matchesStringProperty(it, propName, propValue));
          } else if (typeof propValue === 'number') {
            matchingItems = matchingItems.filter(it => matchesNumberProperty(it, propName, propValue));
          } else if (propValue === null) {
            matchingItems = matchingItems.filter(it => (it[propName] === null));
          } else if (typeof propValue === 'object') {
            if (propValue instanceof Date) {
              matchingItems = matchingItems.filter(it => matchesDateProperty(it, propName, propValue));
            } else if ('id' in propValue) {
              matchingItems = matchingItems.filter(it => matchesIdProperty(it, propName, propValue));
            }
          }
        }
      }
    }

    return matchingItems;
  }

  protected itemExists(image: Partial<Image>) {
    return this.items.some(image2 => (image.code === image2.code));
  }

  protected getIndexOfItem(image: Partial<Image>) {
    return this.items.findIndex(image2 => (image.code === image2.code));
  }
}

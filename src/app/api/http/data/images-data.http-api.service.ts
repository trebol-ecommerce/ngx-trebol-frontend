// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/entities/Image';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class ImagesDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Image> {

  constructor(http: HttpClient) {
    super(http, '/images');
  }

  fetchExisting(image: Partial<Image>) {
    return this.http.get<Image>(
      `${this.baseUrl}/${image.filename}`
    );
  }

  update(image: Partial<Image>) {
    return this.http.put(
      `${this.baseUrl}/${image.filename}`,
      image
    );
  }

  delete(image: Partial<Image>) {
    return this.http.delete(
      `${this.baseUrl}/${image.filename}`
    );
  }
}

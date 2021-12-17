/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from 'src/models/entities/Image';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class ImagesDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Image> {

  constructor(http: HttpClient) {
    super(http, '/images');
  }

  fetchExisting(image: Partial<Image>) {
    return this.http.get<Image>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: String(image.code)
        } })
      }
    );
  }

  update(image: Partial<Image>) {
    return this.http.put(
      this.baseUrl,
      image,
      {
        params: new HttpParams({ fromObject: {
          code: String(image.code)
        } })
      }
    );
  }

  delete(image: Partial<Image>) {
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: String(image.code)
        } })
      }
    );
  }
}

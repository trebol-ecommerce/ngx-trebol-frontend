// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/entities/Image';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';
import { IEntityDataApiService } from '../../entity.data-api.iservice';

@Injectable()
export class ImagesDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Image> {

  baseUrl = `${super.baseUrl}/images`;

  constructor(http: HttpClient) {
    super(http);
  }
}

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/models/DataPage';
import { Image } from 'src/models/entities/Image';
import { ITransactionalEntityDataApiService } from '../../transactional-entity.data-api.iservice';
import { environment } from 'src/environments/environment';
import { makeFetchHttpParams } from '../http-api.functions';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class ImagesDataHttpApiService
  implements ITransactionalEntityDataApiService<Image> {

  private readonly baseUrl = `${environment.apiUrls.data}/images`;

  constructor(private http: HttpClient) { }

  create(item: Image) {
    return this.http.post<void>(
      this.baseUrl,
      item
    );
  }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<Image>>(
      this.baseUrl,
      { params }
    );
  }

  fetchExisting(image: Partial<Image>) {
    return this.http.get<DataPage<Image>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: String(image.code)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(image: Partial<Image>) {
    return this.http.put<void>(
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
    return this.http.delete<void>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: String(image.code)
        } })
      }
    );
  }
}

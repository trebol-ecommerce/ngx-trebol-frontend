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
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ITransactionalEntityDataApiService } from '../../transactional-entity.data-api.iservice';
import { environment } from 'src/environments/environment';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';
import { makeFetchHttpParams } from '../http-api.functions';

@Injectable()
export class ProductCategoriesDataHttpApiService
  implements ITransactionalEntityDataApiService<ProductCategory> {

  private readonly baseUrl = `${environment.apiUrls.data}/product_categories`;

  constructor(private http: HttpClient) { }

  create(item: ProductCategory) {
    return this.http.post<void>(
      this.baseUrl,
      item
    );
  }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<ProductCategory>>(
      this.baseUrl,
      { params }
    );
  }

  fetchExisting(category: Partial<ProductCategory>) {
    return this.http.get<DataPage<ProductCategory>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: String(category.code)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(category: Partial<ProductCategory>, originalItem?: ProductCategory) {
    return this.http.put<void>(
      this.baseUrl,
      category,
      {
        params: new HttpParams({ fromObject: {
          code: String(originalItem.code)
        } })
      }
    );
  }

  delete(category: Partial<ProductCategory>) {
    return this.http.delete<void>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: String(category.code)
        } })
      }
    );
  }
}

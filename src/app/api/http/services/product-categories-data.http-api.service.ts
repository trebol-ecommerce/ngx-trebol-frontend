/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataPage } from 'src/models/DataPage';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class ProductCategoriesDataHttpApiService
  extends TransactionalEntityDataHttpApiService<ProductCategory> {

  constructor(http: HttpClient) {
    super(http, '/product_categories');
  }

  fetchExisting(category: Partial<ProductCategory>): Observable<ProductCategory> {
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

  update(category: Partial<ProductCategory>, originalItem?: ProductCategory): Observable<any> {
    return this.http.put(
      this.baseUrl,
      category,
      {
        params: new HttpParams({ fromObject: {
          code: String(originalItem.code)
        } })
      }
    );
  }

  delete(category: Partial<ProductCategory>): Observable<any> {
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: String(category.code)
        } })
      }
    );
  }

  protected makeHttpParams(pageIndex?: number, pageSize?: number, sortBy?: string, order?: string, filters?: any) {
    let params = (!!filters) ?
      new HttpParams({ fromObject: filters }) :
      new HttpParams();

    if (!!sortBy) {
      params = params.append('sortBy', sortBy);
    }
    if (!!order) {
      params = params.append('order', order);
    }
    return params;
  }
}

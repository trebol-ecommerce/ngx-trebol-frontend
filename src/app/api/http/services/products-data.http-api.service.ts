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
import { Product } from 'src/models/entities/Product';
import { ProductSearchQuery } from 'src/models/ProductSearchQuery';
import { environment } from 'src/environments/environment';
import { ITransactionalEntityDataApiService } from '../../transactional-entity.data-api.iservice';
import { makeFetchHttpParams } from '../http-api.functions';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class ProductsDataHttpApiService
  implements ITransactionalEntityDataApiService<Product> {

  private readonly baseUrl = `${environment.apiUrls.data}/products`;

  constructor(private http: HttpClient) { }

  create(product: Product) {
    if (!product.category) {
      product.category = null;
    }
    return this.http.post<void>(
      this.baseUrl,
      product
    );
  }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = this.makeProductFetchHttpParams(p);
    return this.http.get<DataPage<Product>>(
      this.baseUrl,
      { params }
    );
  }

  fetchExisting(product: Partial<Product>) {
    return this.http.get<DataPage<Product>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          barcode: String(product.barcode)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(product: Partial<Product>) {
    if (!product.category) {
      product.category = null;
    }
    return this.http.put<void>(
      this.baseUrl,
      product,
      {
        params: new HttpParams({ fromObject: {
          barcode: String(product.barcode)
        } })
      }
    );
  }

  delete(product: Partial<Product>) {
    return this.http.delete<void>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          barcode: String(product.barcode)
        } })
      }
    );
  }

  private makeProductFetchHttpParams(p: ApiDataPageQuerySpec) {
    let params = makeFetchHttpParams(p);
    if (params.has('nameLike') && !p.filters.nameLike) {
      params = params.delete('nameLike');
    }
    if (params.has('categoryCode') && !p.filters.categoryCode) {
      params = params.delete('categoryCode');
    }
    return params;
  }
}

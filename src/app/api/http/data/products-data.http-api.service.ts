/*
 * Copyright (c) 2021 The Trébol eCommerce Project
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
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class ProductsDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Product> {

  constructor(http: HttpClient) {
    super(http, '/products');
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
    return this.http.put(
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
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          barcode: String(product.barcode)
        } })
      }
    );
  }

  protected makeHttpParams(pageIndex: number, pageSize: number, sortBy?: string, order?: string, filters?: Partial<ProductSearchQuery>) {
    let params = super.makeHttpParams(pageIndex, pageSize, sortBy, order, filters);

    if (params.has('nameLike') && !filters.nameLike) {
      params = params.delete('nameLike');
    }
    if (params.has('categoryCode') && !filters.categoryCode) {
      params = params.delete('categoryCode');
    }

    return params;
  }
}

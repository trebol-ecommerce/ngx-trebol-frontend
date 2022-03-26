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
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';
import { ITransactionalProductListContentsDataApiService } from '../../transactional-product-list-contents.data.api.iservice';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class ProductListsDataHttpApiService
  extends TransactionalEntityDataHttpApiService<ProductList>
  implements ITransactionalProductListContentsDataApiService {

  contentsBaseUrl = `${environment.apiUrls.data}/product_list_contents`;

  constructor(http: HttpClient) {
    super(http, '/product_lists');
  }

  fetchExisting(list: Partial<ProductList>): Observable<ProductList> {
    return this.http.get<DataPage<ProductList>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: list.code
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(list: Partial<ProductList>, originalItem?: ProductList): Observable<any> {
    return this.http.put(
      this.baseUrl,
      list,
      {
        params: new HttpParams({ fromObject: {
          code: originalItem.code
        } })
      }
    );
  }

  delete(list: Partial<ProductList>): Observable<any> {
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: list.code
        } })
      }
    );
  }

  fetchContents(list: ProductList, pageIndex?: number, pageSize?: number, sortBy?: string, order?: string): Observable<DataPage<Product>> {
    const params = this.makeHttpParams(pageIndex, pageSize, sortBy, order).append('listCode', list.code);

    return this.http.get<DataPage<Product>>(
      this.contentsBaseUrl,
      { params }
    );
  }

  addToContents(list: ProductList, productLike: Partial<Product>): Observable<any> {
    return this.http.post(
      this.contentsBaseUrl,
      productLike,
      {
        params: new HttpParams({ fromObject: {
          listCode: list.code
        } })
      }
    );
  }

  deleteFromContents(list: ProductList, productLike?: Partial<Product>): Observable<any> {
    return this.http.delete(
      this.contentsBaseUrl,
      {
        params: new HttpParams({ fromObject: {
          listCode: list.code,
          productCode: productLike.barcode
        } })
      }
    );
  }

  updateContents(list: ProductList, products: Partial<Product>[]): Observable<any> {
    return this.http.put(
      this.contentsBaseUrl,
      products,
      {
        params: new HttpParams({ fromObject: {
          listCode: list.code
        } })
      }
    );
  }
}

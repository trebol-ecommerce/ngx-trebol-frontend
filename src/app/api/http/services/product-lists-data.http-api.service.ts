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
import { makeFetchHttpParams } from '../http-api.functions';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class ProductListsDataHttpApiService
  implements ITransactionalProductListContentsDataApiService {

  private readonly baseUrl = `${environment.apiUrls.data}/product_lists`;
  private readonly contentsBaseUrl = `${environment.apiUrls.data}/product_list_contents`;

  constructor(private http: HttpClient) { }

  create(item: ProductList) {
    return this.http.post<void>(
      this.baseUrl,
      item
    );
  }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<ProductList>>(
      this.baseUrl,
      { params }
    );
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

  update(list: Partial<ProductList>, originalItem?: ProductList) {
    return this.http.put<void>(
      this.baseUrl,
      list,
      {
        params: new HttpParams({ fromObject: {
          code: originalItem.code
        } })
      }
    );
  }

  delete(list: Partial<ProductList>) {
    return this.http.delete<void>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: list.code
        } })
      }
    );
  }

  fetchContents(list: ProductList, p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p).append('listCode', list.code);

    return this.http.get<DataPage<Product>>(
      this.contentsBaseUrl,
      { params }
    );
  }

  addToContents(list: ProductList, productLike: Partial<Product>) {
    return this.http.post<void>(
      this.contentsBaseUrl,
      productLike,
      {
        params: new HttpParams({ fromObject: {
          listCode: list.code
        } })
      }
    );
  }

  deleteFromContents(list: ProductList, productLike?: Partial<Product>) {
    return this.http.delete<void>(
      this.contentsBaseUrl,
      {
        params: new HttpParams({ fromObject: {
          listCode: list.code,
          productCode: productLike.barcode
        } })
      }
    );
  }

  updateContents(list: ProductList, products: Partial<Product>[]) {
    return this.http.put<void>(
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

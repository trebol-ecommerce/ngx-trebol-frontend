/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/entities/Product';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class ProductsDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Product>
  implements IEntityDataApiService<Product> {

  constructor(http: HttpClient) {
    super(http, '/products');
  }

  fetchExisting(product: Partial<Product>) {
    return this.http.get<Product>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          barcode: String(product.barcode)
        } })
      }
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
}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
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
      `${this.baseUrl}/${product.barcode}`
    );
  }

  update(product: Partial<Product>) {
    return this.http.put(
      `${this.baseUrl}/${product.barcode}`,
      product
    );
  }

  delete(product: Partial<Product>) {
    return this.http.delete(
      `${this.baseUrl}/${product.barcode}`
    );
  }
}

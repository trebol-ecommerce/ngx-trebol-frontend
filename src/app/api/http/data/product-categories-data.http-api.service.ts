/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class ProductCategoriesDataHttpApiService
  extends TransactionalEntityDataHttpApiService<ProductCategory> {

  constructor(http: HttpClient) {
    super(http, '/product_categories');
  }

  fetchExisting(category: Partial<ProductCategory>): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          code: String(category.code)
        } })
      }
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
}

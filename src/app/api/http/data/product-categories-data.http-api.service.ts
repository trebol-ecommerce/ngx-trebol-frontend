/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { DataPage } from 'src/app/models/DataPage';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { environment } from 'src/environments/environment';
import { IProductCategoriesDataApiService } from '../../product-categories.data-api.iservice';
import { HttpApiService } from '../http-api.abstract.service';

@Injectable()
export class ProductCategoriesDataHttpApiService
  extends HttpApiService
  implements IProductCategoriesDataApiService {

  baseUrl = `${environment.apiUrls.data}/product_categories`;

  constructor(http: HttpClient) {
    super(http);
  }

  readAllProductCategories() {
    return this.http.get<DataPage<ProductCategory>>(
      this.baseUrl
    ).pipe(
      map(page => page.items),
      retry(2)
    );
  }

  readAllProductCategoriesByParentCode(parentCode: number) {
    return this.http.get<DataPage<ProductCategory>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          familyId: String(parentCode)
        } })
      }
    ).pipe(
      map(page => page.items),
      retry(2)
    );
  }
}

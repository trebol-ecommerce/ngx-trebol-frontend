/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { DataPage } from 'src/app/models/DataPage';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { environment } from 'src/environments/environment';
import { ICategoriesPublicApiService } from '../../categories-public-api.iservice';

@Injectable()
export class CategoriesPublicHttpApiService
  extends HttpApiService
  implements ICategoriesPublicApiService {

  protected baseUrl = `${environment.apiUrls.public}/categories`;

  constructor(http: HttpClient) {
    super(http);
  }

  fetchRootProductCategories() {
    return this.http.get<DataPage<ProductCategory>>(
      this.baseUrl
    );
  }

  fetchChildrenProductCategoriesByParentCode(parentCode: number) {
    return this.http.get<DataPage<ProductCategory>>(
      `${this.baseUrl}/${parentCode}`
    );
  }
}

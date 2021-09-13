// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { DataPage } from 'src/app/models/DataPage';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { environment } from 'src/environments/environment';
import { ICategoriesPublicApiService } from '../../categories-public-api.iservice';

@Injectable()
export class CategoriesHttpApiService
  extends HttpApiService
  implements ICategoriesPublicApiService {

  protected baseUrl = environment.apiUrls.store;

  constructor(http: HttpClient) {
    super(http);
  }

  fetchChildrenProductCategoriesByParentCode(parentId: string) {
    return this.http.get<DataPage<ProductCategory>>(
      `${this.baseUrl}/categories/${parentId}`
    );
  }

  fetchRootProductCategories() {
    return this.http.get<DataPage<ProductCategory>>(
      `${this.baseUrl}/categories`
    );
  }
}

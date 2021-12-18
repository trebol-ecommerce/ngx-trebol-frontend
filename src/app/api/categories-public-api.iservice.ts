/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { DataPage } from '../../models/DataPage';

export interface ICategoriesPublicApiService {
  fetchChildrenProductCategoriesByParentCode(parentCode: string): Observable<DataPage<ProductCategory>>;
  fetchRootProductCategories(): Observable<DataPage<ProductCategory>>;
}

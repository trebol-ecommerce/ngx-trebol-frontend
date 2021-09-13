// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { SellType } from 'src/app/models/entities/SellType';
import { Person } from 'src/app/models/entities/Person';
import { UserRole } from 'src/app/models/entities/UserRole';

export interface ISharedDataApiService {
  readAllPeople(): Observable<Person[]>;
  readAllProductCategories(): Observable<ProductCategory[]>;
  readAllProductCategoriesByParentCode(parentCode: string): Observable<ProductCategory[]>;
  readAllSellTypes(): Observable<SellType[]>;
  readAllUserRoles(): Observable<UserRole[]>;
}

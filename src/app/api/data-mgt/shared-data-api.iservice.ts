// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { SellType } from 'src/app/models/entities/SellType';

export interface SharedDataApiIService {
  readAllProductFamilies(): Observable<ProductFamily[]>;
  readAllProductTypes(): Observable<ProductType[]>;
  readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]>;
  readAllSellTypes(): Observable<SellType[]>;
}
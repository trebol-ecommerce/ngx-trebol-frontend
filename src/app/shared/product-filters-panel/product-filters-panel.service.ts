// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFamily } from 'src/app/data/models/entities/ProductFamily';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { ProductType } from 'src/app/data/models/entities/ProductType';
import { StoreCatalogDataIService } from 'src/app/data/store.catalog.data.iservice';

@Injectable({ providedIn: 'root' })
export class ProductFiltersPanelService {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.storeCatalog) protected catalogService: StoreCatalogDataIService,
  ) { }

  public getAllProductFamilies(): Observable<ProductFamily[]> {
    return this.catalogService.readProductFamilies();
  }

  public getProductTypesFromFamilyId(id: number): Observable<ProductType[]> {
    return this.catalogService.readProductTypesByFamilyId(id);
  }

}

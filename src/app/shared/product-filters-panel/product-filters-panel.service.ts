// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { ProductType } from 'src/app/models/entities/ProductType';
import { StoreCatalogDataIService } from 'src/app/api/data-mgt/store.catalog.data.iservice';

@Injectable({ providedIn: 'root' })
export class ProductFiltersPanelService {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.storeCatalog) protected catalogService: StoreCatalogDataIService,
  ) { }

  public getAllProductFamilies(): Observable<ProductFamily[]> {
    return this.catalogService.readProductFamilies();
  }

  public getProductTypesFromFamilyId(id: number): Observable<ProductType[]> {
    return this.catalogService.readProductTypesByFamilyId(id);
  }

}

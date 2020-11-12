// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ProductType } from 'src/app/models/entities/ProductType';
import { StoreApiIService } from 'src/app/api/store/store-api.iservice';

@Injectable({ providedIn: 'root' })
export class ProductFiltersPanelService {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.store) protected apiService: StoreApiIService,
  ) { }

  public getAllProductFamilies(): Observable<ProductFamily[]> {
    return this.apiService.fetchAllProductFamilies();
  }

  public getProductTypesFromFamilyId(id: number): Observable<ProductType[]> {
    return this.apiService.fetchProductTypesByFamilyId(id);
  }

}

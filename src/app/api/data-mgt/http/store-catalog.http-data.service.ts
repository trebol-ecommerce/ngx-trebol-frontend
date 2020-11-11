// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { HttpService } from 'src/app/shared/http.abstract-service';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { StoreCatalogDataIService } from '../store.catalog.data.iservice';

@Injectable()
export class StoreCatalogHttpDataService
  extends HttpService
  implements StoreCatalogDataIService {

  protected baseURI = `${this.baseURI}/catalog`;

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public readById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseURI}/product/${id}`
    );
  }

  public readAll(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseURI}/products`
    );
  }

  public readFiltered(filters: ProductFilters): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseURI}/products`,
      this.httpParamsOf(filters)
    );
  }

  public readProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `${this.baseURI}/product_types`
    );
  }

  public readProductTypesByFamilyId(productFamilyId: number): Observable<ProductType[]> {
    const filter = { familyId: productFamilyId };
    return this.http.get<ProductType[]>(
      `${this.baseURI}/product_types`,
      this.httpParamsOf(filter)
    );
  }

  public readProductFamilies(): Observable<ProductFamily[]> {
    return this.http.get<ProductFamily[]>(
      `${this.baseURI}/product_families`
    );
  }
}

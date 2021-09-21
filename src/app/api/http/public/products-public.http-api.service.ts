/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { DataPage } from 'src/app/models/DataPage';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { environment } from 'src/environments/environment';
import { IProductsPublicApiService } from '../../products-public-api.iservice';

@Injectable()
export class ProductsPublicHttpApiService
  extends HttpApiService
  implements IProductsPublicApiService {

  protected baseUrl = `${environment.apiUrls.public}/products`;

  constructor(http: HttpClient) {
    super(http);
  }

  fetchStoreFrontProductCollection() {
    return this.http.get<DataPage<Product>>(
      this.baseUrl
    );
  }

  fetchProductByBarcode(barcode: string) {
    return this.http.get<Product>(
      `${this.baseUrl}/${barcode}`
    );
  }

  fetchFilteredProductCollection(filters: ProductFilters) {
    return this.http.get<DataPage<Product>>(
      this.baseUrl,
      {  params: new HttpParams({ fromObject: filters as any }) }
    );
  }
}

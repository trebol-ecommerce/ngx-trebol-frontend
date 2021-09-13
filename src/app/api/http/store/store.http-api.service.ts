// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { IStoreApiService } from '../../store-api.iservice';
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { Receipt } from 'src/app/models/entities/Receipt';
import { environment } from 'src/environments/environment';
import { DataPage } from 'src/app/models/DataPage';

@Injectable()
export class StoreHttpApiService
  extends HttpApiService
  implements IStoreApiService {

  protected baseUrl = environment.apiUrls.store;

  constructor(http: HttpClient) {
    super(http);
  }

  public fetchProductById(id: number) {
    return this.http.get<Product>(
      `${this.baseUrl}/products/${id}`
    );
  }

  public fetchStoreFrontProductCollection() {
    return this.http.get<DataPage<Product>>(
      `${this.baseUrl}/products`
    );
  }

  public fetchFilteredProductCollection(filters: ProductFilters) {
    return this.http.get<DataPage<Product>>(
      `${this.baseUrl}/products`,
      {  params: new HttpParams({ fromObject: filters as any }) }
    );
  }

  public fetchCompanyDetails() {
    return this.http.get<CompanyDetails>(
      `${this.baseUrl}/about`
    );
  }

  public submitCart(details: SellDetail[]) {
    return this.http.post<ExternalPaymentRedirectionData>(
      `${this.baseUrl}/checkout`,
      details
    );
  }

  public fetchTransactionReceiptById(id: number) {
    return this.http.get<Receipt>(
      `${this.baseUrl}/receipt/${id}`
    );
  }
}

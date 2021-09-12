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
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { IStoreApiService } from '../../store-api.iservice';
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { Receipt } from 'src/app/models/entities/Receipt';
import { environment } from 'src/environments/environment';

@Injectable()
export class StoreHttpApiService
  extends HttpApiService
  implements IStoreApiService {

  protected baseUrl = environment.apiUrls.store;

  constructor(http: HttpClient) {
    super(http);
  }

  public fetchProductById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseUrl}/product/${id}`
    );
  }

  public fetchStoreFrontProductCollection(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/front`
    );
  }

  public fetchFilteredProductCollection(filters: ProductFilters): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/front`,
      {  params: new HttpParams({ fromObject: filters as any }) }
    );
  }

  public fetchProductTypesByFamilyId(productFamilyId: number): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `${this.baseUrl}/categories/${productFamilyId}`
    );
  }

  public fetchAllProductFamilies(): Observable<ProductFamily[]> {
    return this.http.get<ProductFamily[]>(
      `${this.baseUrl}/categories`
    );
  }

  public fetchCompanyDetails(): Observable<CompanyDetails> {
    return this.http.get<CompanyDetails>(
      `${this.baseUrl}/about`
    );
  }

  public submitCart(details: SellDetail[]): Observable<ExternalPaymentRedirectionData> {
    return this.http.post<ExternalPaymentRedirectionData>(
      `${this.baseUrl}/checkout`,
      details
    );
  }

  public fetchTransactionReceiptById(id: number): Observable<Receipt> {
    return this.http.get<Receipt>(
      `${this.baseUrl}/receipt/${id}`
    );
  }
}

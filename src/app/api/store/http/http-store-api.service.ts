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
import { StoreApiIService } from '../store-api.iservice';
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';

@Injectable()
export class HttpStoreApiService
  extends HttpService
  implements StoreApiIService {

  protected baseURI = `${this.baseURI}/catalog`;

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public fetchProductById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseURI}/product/${id}`
    );
  }

  public fetchStoreFrontProductCollection(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseURI}/products`
    );
  }

  public fetchFilteredProductCollection(filters: ProductFilters): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseURI}/products`,
      this.httpParamsOf(filters)
    );
  }

  public fetchAllProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `${this.baseURI}/product_types`
    );
  }

  public fetchProductTypesByFamilyId(productFamilyId: number): Observable<ProductType[]> {
    const filter = { familyId: productFamilyId };
    return this.http.get<ProductType[]>(
      `${this.baseURI}/product_types`,
      this.httpParamsOf(filter)
    );
  }

  public fetchAllProductFamilies(): Observable<ProductFamily[]> {
    return this.http.get<ProductFamily[]>(
      `${this.baseURI}/product_families`
    );
  }

  public fetchCompanyDetails(): Observable<CompanyDetails> {
    return this.http.get<CompanyDetails>(
      `${this.baseURI}/company`
    );
  }

  public submitCart(details: SellDetail[]): Observable<ExternalPaymentRedirectionData> {
    return this.http.post<ExternalPaymentRedirectionData>(
      `${this.baseURI}/checkout`,
      details
    );
  }
}

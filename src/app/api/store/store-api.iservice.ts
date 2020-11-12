// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { ProductType } from 'src/app/models/entities/ProductType';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';

export interface StoreApiIService {
  fetchProductById(id: number): Observable<Product>;
  fetchStoreFrontProductCollection(): Observable<Product[]>;
  fetchFilteredProductCollection(filters: ProductFilters): Observable<Product[]>;
  fetchAllProductTypes(): Observable<ProductType[]>;
  fetchProductTypesByFamilyId(productFamilyId: number): Observable<ProductType[]>;
  fetchAllProductFamilies(): Observable<ProductFamily[]>;
  fetchCompanyDetails(): Observable<CompanyDetails>;
  submitCart(details: SellDetail[]): Observable<ExternalPaymentRedirectionData>;
}
/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { Product } from 'src/models/entities/Product';
import { ProductFilters } from "src/app/shared/components/product-filters-panel/ProductFilters";
import { DataPage } from '../../models/DataPage';

export interface IProductsPublicApiService {
  fetchStoreFrontProductCollection(): Observable<DataPage<Product>>;
  fetchProductByBarcode(barcode: string): Observable<Product>;
  fetchFilteredProductCollection(filters: ProductFilters): Observable<DataPage<Product>>;
}

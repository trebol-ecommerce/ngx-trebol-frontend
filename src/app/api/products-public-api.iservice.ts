// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { DataPage } from '../models/DataPage';

export interface IProductsPublicApiService {
  fetchStoreFrontProductCollection(): Observable<DataPage<Product>>;
  fetchProductByBarcode(barcode: string): Observable<Product>;
  fetchFilteredProductCollection(filters: ProductFilters): Observable<DataPage<Product>>;
}

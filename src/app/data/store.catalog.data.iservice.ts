import { Observable } from 'rxjs';
import { ProductFilters } from '../shared/product-filters-panel/product-filters-panel.component';
import { Product } from './models/entities/Product';

export interface StoreCatalogDataIService {
  readById(id: number): Observable<Product>;
  readAll(): Observable<Product[]>;
  readFiltered(filters: ProductFilters): Observable<Product[]>;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/data/models/entities/Product';
import { HttpService } from 'src/app/shared/http.abstract-service';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
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
}

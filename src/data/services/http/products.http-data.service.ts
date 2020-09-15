import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFilters } from 'src/shared/product-filters-panel/product-filters-panel.component';
import { Product } from 'src/data/models/entities/Product';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { EntityDataIService } from '../entity.data.iservice';

@Injectable()
export class ProductsHttpDataService
  extends HttpService
  implements EntityDataIService<Product> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public create(product: Product): Observable<number> {
    return this.http.post<number>(
      `${this.baseURI}/product`,
      product
    );
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

  public readByTypeId(typeId: number): Observable<Product[]> {
    return this.readFiltered({ typeId });
  }

  public readByFamilyId(familyId: number): Observable<Product[]> {
    return this.readFiltered({ familyId });
  }

  public update(product: Product, id: string | number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/product/${id}`,
      product
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/product/${id}`
    );
  }
}

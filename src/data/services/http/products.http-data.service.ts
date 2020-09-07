import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
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
  readById(id: string | number): Observable<Product> {
    throw new Error('Method not implemented.');
  }
  update(emp: Product, id: string | number): Observable<number> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.baseURI + '/products'
    ).pipe(
      retry(2)
    );
  }

  public readFiltered(filters: ProductFilters): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.baseURI + '/products',
      this.httpParamsOf(filters)
    ).pipe(
      retry(2)
    );
  }

  public readByTypeId(typeId: number): Observable<Product[]> {
    return this.readFiltered({
      typeId: typeId
    });
  }

  public readByFamilyId(familyId: number): Observable<Product[]> {
    return this.readFiltered({
      familyId: familyId
    });
  }

  public create(product: Product): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/product',
      product
    );
  }

  public deleteById(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseURI + `/product/${productId}`
    );
  }
}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';

@Injectable()
export class ProductsDataHttpApiService
  extends EntityDataHttpApiService
  implements IEntityDataApiService<Product> {

  baseUrl = `${super.baseUrl}/products`;

  constructor(http: HttpClient) {
    super(http);
  }

  public create(instance: Product): Observable<number> {
    return this.http.post<number>(
      this.baseUrl,
      instance
    );
  }

  public readById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseUrl}/${id}`
    );
  }

  public readAll(): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.baseUrl,
    );
  }

  public readFiltered(filters: ProductFilters): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters as any })
      }
    );
  }

  public readByTypeId(typeId: number): Observable<Product[]> {
    return this.readFiltered({ typeId });
  }

  public readByFamilyId(familyId: number): Observable<Product[]> {
    return this.readFiltered({ familyId });
  }

  public update(instance: Product, id: string | number): Observable<number> {
    return this.http.put<number>(
      `${this.baseUrl}/${id}`,
      instance
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseUrl}/${id}`
    );
  }
}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from 'src/app/models/entities/Seller';
import { EntityHttpCrudService } from './entity.http-crud.aservice';
import { EntityCrudIService } from '../entity.crud.iservice';

@Injectable()
export class SellersHttpCrudService
  extends EntityHttpCrudService
  implements EntityCrudIService<Seller> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public create(seller: Seller): Observable<number> {
    return this.http.post<number>(
      `${this.baseURI}/seller`,
      seller
    );
  }

  public readById(id: number): Observable<Seller> {
    return this.http.get<Seller>(
      `${this.baseURI}/seller/${id}`
    );
  }

  public readAll(): Observable<Seller[]> {
    return this.http.get<Seller[]>(
      `${this.baseURI}/sellers`
    );
  }

  public readFiltered(filters: any): Observable<Seller[]> {
    return this.http.get<Seller[]>(
      `${this.baseURI}/sellers`,
      this.httpParamsOf(filters)
    );
  }

  public update(seller: Seller, id: number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/seller/${id}`,
      seller
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/seller/${id}`
    );
  }
}

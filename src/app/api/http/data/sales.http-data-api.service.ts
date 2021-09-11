// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { CompositeEntityDataApiIService } from '../../composite-entity-data-api.iservice';
import { HttpDataApiService } from '../http-data-api.aservice';

@Injectable()
export class SalesHttpDataApiService
  extends HttpDataApiService
  implements CompositeEntityDataApiIService<Sell, SellDetail> {

  constructor(
    protected http: HttpClient
  ) {
    super();
    this.baseURI = `${this.baseURI}/sales`;
  }

  public create(instance: Sell): Observable<number> {
    return this.http.post<number>(
      this.baseURI,
      instance
    );
  }

  public readById(id: number): Observable<Sell> {
    return this.http.get<Sell>(
      `${this.baseURI}/${id}`
    );
  }

  public readDetailsById(id: number): Observable<SellDetail[]> {
    return this.readById(id).pipe(
      map(s => s.details)
    );
  }

  public readAll(): Observable<Sell[]> {
    return this.http.get<Sell[]>(
      this.baseURI,
    );
  }

  public readFiltered(filters: any): Observable<Sell[]> {
    return this.http.get<Sell[]>(
      this.baseURI,
      this.httpParamsOf(filters)
    );
  }

  public update(instance: Sell, id: number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/${id}`,
      instance
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/${id}`
    );
  }
}

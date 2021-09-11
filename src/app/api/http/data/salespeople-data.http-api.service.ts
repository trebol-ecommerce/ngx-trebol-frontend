// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { HttpDataApiService } from '../entity-data.http-api.abstract.service';
import { EntityDataApiIService } from '../../entity-data-api.iservice';

@Injectable()
export class SalespeopleDataHttpApiService
  extends HttpDataApiService
  implements EntityDataApiIService<Salesperson> {

  constructor(
    protected http: HttpClient
  ) {
    super();
    this.baseURI = `${this.baseURI}/salespeople`;
  }

  public create(instance: Salesperson): Observable<number> {
    return this.http.post<number>(
      this.baseURI,
      instance
    );
  }

  public readById(id: number): Observable<Salesperson> {
    return this.http.get<Salesperson>(
      `${this.baseURI}/${id}`
    );
  }

  public readAll(): Observable<Salesperson[]> {
    return this.http.get<Salesperson[]>(
      this.baseURI,
    );
  }

  public readFiltered(filters: any): Observable<Salesperson[]> {
    return this.http.get<Salesperson[]>(
      this.baseURI,
      this.httpParamsOf(filters)
    );
  }

  public update(instance: Salesperson, id: number): Observable<number> {
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

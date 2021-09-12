// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';
import { IEntityDataApiService } from '../../entity.data-api.iservice';

@Injectable()
export class SalespeopleDataHttpApiService
  extends EntityDataHttpApiService
  implements IEntityDataApiService<Salesperson> {

  baseUrl = `${super.baseUrl}/salespeople`;

  constructor(http: HttpClient) {
    super(http);
  }

  public create(instance: Salesperson): Observable<number> {
    return this.http.post<number>(
      this.baseUrl,
      instance
    );
  }

  public readById(id: number): Observable<Salesperson> {
    return this.http.get<Salesperson>(
      `${this.baseUrl}/${id}`
    );
  }

  public readAll(): Observable<Salesperson[]> {
    return this.http.get<Salesperson[]>(
      this.baseUrl,
    );
  }

  public readFiltered(filters: any): Observable<Salesperson[]> {
    return this.http.get<Salesperson[]>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters })
      }
    );
  }

  public update(instance: Salesperson, id: number): Observable<number> {
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

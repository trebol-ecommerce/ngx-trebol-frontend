// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ICompositeEntityDataApiService } from '../../composite-entity.data-api.iservice';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';

@Injectable()
export class SalesDataHttpApiService
  extends EntityDataHttpApiService
  implements ICompositeEntityDataApiService<Sell, SellDetail> {

  baseUrl = `${super.baseUrl}/sales`;

  constructor(http: HttpClient) {
    super(http);
  }

  public create(instance: Sell) {
    return this.http.post<void>(
      this.baseUrl,
      instance
    );
  }

  public readById(id: number) {
    return this.http.get<Sell>(
      `${this.baseUrl}/${id}`
    );
  }

  public readDetailsById(id: number) {
    return this.readById(id).pipe(
      map(s => s.details)
    );
  }

  public readAll() {
    return this.http.get<Sell[]>(
      this.baseUrl,
    );
  }

  public readFiltered(filters: any) {
    return this.http.get<Sell[]>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters })
      }
    );
  }

  public update(instance: Sell, id: number) {
    return this.http.put<void>(
      `${this.baseUrl}/${id}`,
      instance
    );
  }

  public deleteById(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );
  }
}

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/models/DataPage';
import { Salesperson } from 'src/models/entities/Salesperson';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class SalespeopleDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Salesperson> {

  constructor(http: HttpClient) {
    super(http, '/salespeople');
  }

  fetchExisting(salesperson: Partial<Salesperson>) {
    return this.http.get<DataPage<Salesperson>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(salesperson.person.idNumber)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(salesperson: Partial<Salesperson>) {
    return this.http.put(
      this.baseUrl,
      salesperson,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(salesperson.person.idNumber)
        } })
      }
    );
  }

  delete(salesperson: Partial<Salesperson>) {
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(salesperson.person.idNumber)
        } })
      }
    );
  }
}

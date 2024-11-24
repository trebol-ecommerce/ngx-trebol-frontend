/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/models/DataPage';
import { Person } from 'src/models/entities/Person';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class SalespeopleDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Person> {

  constructor(http: HttpClient) {
    super(http, '/salespeople');
  }

  fetchExisting(salesperson: Partial<Person>) {
    return this.http.get<DataPage<Person>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(salesperson.idNumber)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(salesperson: Partial<Person>) {
    return this.http.put(
      this.baseUrl,
      salesperson,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(salesperson.idNumber)
        } })
      }
    );
  }

  delete(salesperson: Partial<Person>) {
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(salesperson.idNumber)
        } })
      }
    );
  }
}

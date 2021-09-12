// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/entities/Customer';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';
import { IEntityDataApiService } from '../../entity.data-api.iservice';

@Injectable()
export class CustomersDataHttpApiService
  extends EntityDataHttpApiService
  implements IEntityDataApiService<Customer> {

  baseUrl = `${super.baseUrl}/customers`;

  constructor(http: HttpClient) {
    super(http);
  }

  public create(instance: Customer) {
    return this.http.post<void>(
      this.baseUrl,
      instance
    );
  }

  public readById(id: number) {
    return this.http.get<Customer>(
      `${this.baseUrl}/${id}`
    );
  }

  public readAll() {
    return this.http.get<Customer[]>(
      this.baseUrl
    );
  }

  public readFiltered(filters: any) {
    return this.http.get<Customer[]>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters })
      }
    );
  }

  public update(instance: Customer, id: number) {
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
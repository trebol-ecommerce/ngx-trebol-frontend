// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/entities/Customer';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';
import { IEntityDataApiService } from '../../entity.data-api.iservice';

@Injectable()
export class CustomersDataHttpApiService
  extends EntityDataHttpApiService
  implements IEntityDataApiService<Customer> {

  constructor(
    protected http: HttpClient
  ) {
    super();
    this.baseURI = `${this.baseURI}/customers`;
  }

  public create(instance: Customer): Observable<number> {
    return this.http.post<number>(
      this.baseURI,
      instance
    );
  }

  public readById(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.baseURI}/${id}`
    );
  }

  public readAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      this.baseURI
    );
  }

  public readFiltered(filters: any): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      this.baseURI,
      this.httpParamsOf(filters)
    );
  }

  public update(instance: Customer, id: number): Observable<number> {
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

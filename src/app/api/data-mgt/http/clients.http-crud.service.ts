// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/entities/Client';
import { EntityHttpCrudService } from './entity.http-crud.aservice';
import { EntityCrudIService } from '../entity.crud.iservice';

@Injectable()
export class ClientsHttpCrudService
  extends EntityHttpCrudService
  implements EntityCrudIService<Client> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public create(client: Client): Observable<number> {
    return this.http.post<number>(
      `${this.baseURI}/client`,
      client
    );
  }

  public readById(id: number): Observable<Client> {
    return this.http.get<Client>(
      `${this.baseURI}/client/${id}`
    );
  }

  public readAll(): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${this.baseURI}/clients`
    );
  }

  public readFiltered(filters: any): Observable<Client[]> {
    return this.http.get<Client[]>(
      `${this.baseURI}/clients`,
      this.httpParamsOf(filters)
    );
  }

  public update(client: Client, id: number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/client/${id}`,
      client
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/client/${id}`
    );
  }
}

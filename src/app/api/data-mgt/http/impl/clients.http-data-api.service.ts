// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/entities/Client';
import { HttpDataApiService } from '../http-data-api.aservice';
import { EntityDataApiIService } from '../../entity-data-api.iservice';

@Injectable()
export class ClientsHttpDataApiService
  extends HttpDataApiService
  implements EntityDataApiIService<Client> {

  constructor(
    protected http: HttpClient
  ) {
    super();
    this.baseURI = `${this.baseURI}/clients`;
  }

  public create(client: Client): Observable<number> {
    return this.http.post<number>(
      this.baseURI,
      client
    );
  }

  public readById(id: number): Observable<Client> {
    return this.http.get<Client>(
      `${this.baseURI}/${id}`
    );
  }

  public readAll(): Observable<Client[]> {
    return this.http.get<Client[]>(
      this.baseURI
    );
  }

  public readFiltered(filters: any): Observable<Client[]> {
    return this.http.get<Client[]>(
      this.baseURI,
      this.httpParamsOf(filters)
    );
  }

  public update(client: Client, id: number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/${id}`,
      client
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/${id}`
    );
  }
}

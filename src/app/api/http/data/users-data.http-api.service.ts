// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/entities/User';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';
import { EntityDataApiIService } from '../../entity-data-api.iservice';

@Injectable()
export class UsersDataHttpApiService
  extends EntityDataHttpApiService
  implements EntityDataApiIService<User> {

  constructor(
    protected http: HttpClient
  ) {
    super();
    this.baseURI = `${this.baseURI}/users`;
  }

  public create(instance: User): Observable<number> {
    return this.http.post<number>(
      this.baseURI,
      instance
    );
  }

  public readById(id:  number): Observable<User> {
    return this.http.get<User>(
      `${this.baseURI}/${id}`
    );
  }

  public readAll(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseURI,
    );
  }

  public readFiltered(filters: any): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseURI,
      this.httpParamsOf(filters)
    );
  }

  public update(instance: User, id: string | number): Observable<number> {
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

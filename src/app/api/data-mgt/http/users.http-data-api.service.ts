// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/entities/User';
import { EntityHttpDataApiService } from './entity.http-data-api.aservice';
import { EntityDataApiIService } from '../entity-data-api.iservice';

@Injectable()
export class UsersHttpDataApiService
  extends EntityHttpDataApiService
  implements EntityDataApiIService<User> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public create(user: User): Observable<number> {
    return this.http.post<number>(
      `${this.baseURI}/user`,
      user
    );
  }

  public readById(userId:  number): Observable<User> {
    return this.http.get<User>(
      `${this.baseURI}/user/${userId}`
    );
  }

  public readAll(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseURI}/users`
    );
  }

  public readFiltered(filters: any): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseURI}/users`,
      this.httpParamsOf(filters)
    );
  }

  public update(user: User, userId: string | number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/user/${userId}`,
      user
    );
  }

  public deleteById(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/user/${userId}`
    );
  }
}

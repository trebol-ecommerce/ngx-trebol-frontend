// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/entities/User';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';
import { IEntityDataApiService } from '../../entity.data-api.iservice';

@Injectable()
export class UsersDataHttpApiService
  extends EntityDataHttpApiService
  implements IEntityDataApiService<User> {

  baseUrl = `${super.baseUrl}/users`;

  constructor(http: HttpClient) {
    super(http);
  }

  public create(instance: User): Observable<number> {
    return this.http.post<number>(
      this.baseUrl,
      instance
    );
  }

  public readById(id:  number): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/${id}`
    );
  }

  public readAll(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseUrl,
    );
  }

  public readFiltered(filters: any): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters })
      }
    );
  }

  public update(instance: User, id: string | number): Observable<number> {
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

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
import { DataPage } from 'src/app/models/DataPage';

@Injectable()
export class UsersDataHttpApiService
  extends EntityDataHttpApiService
  implements IEntityDataApiService<User> {

  baseUrl = `${super.baseUrl}/users`;

  constructor(http: HttpClient) {
    super(http);
  }

  public create(instance: User) {
    return this.http.post<void>(
      this.baseUrl,
      instance
    );
  }

  public readById(id:  number) {
    return this.http.get<User>(
      `${this.baseUrl}/${id}`
    );
  }

  public readAll() {
    return this.http.get<DataPage<User>>(
      this.baseUrl,
    );
  }

  public readFiltered(filters: any) {
    return this.http.get<DataPage<User>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters })
      }
    );
  }

  public update(instance: User, id: string | number) {
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

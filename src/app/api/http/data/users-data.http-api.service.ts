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
import { User } from 'src/models/entities/User';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class UsersDataHttpApiService
  extends TransactionalEntityDataHttpApiService<User> {

  constructor(http: HttpClient) {
    super(http, '/users');
  }

  fetchExisting(user: Partial<User>) {
    return this.http.get<DataPage<User>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          name: String(user.name)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(user: Partial<User>) {
    return this.http.put(
      this.baseUrl,
      user,
      {
        params: new HttpParams({ fromObject: {
          name: String(user.name)
        } })
      }
    );
  }

  delete(user: Partial<User>) {
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          name: String(user.name)
        } })
      }
    );
  }
}

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/entities/User';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class UsersDataHttpApiService
  extends TransactionalEntityDataHttpApiService<User> {

  constructor(http: HttpClient) {
    super(http, '/users');
  }

  fetchExisting(user: Partial<User>) {
    return this.http.get<User>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          name: String(user.name)
        } })
      }
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

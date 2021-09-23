/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/entities/User';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class UsersDataHttpApiService
  extends TransactionalEntityDataHttpApiService<User>
  implements IEntityDataApiService<User> {

  constructor(http: HttpClient) {
    super(http, '/users');
  }

  fetchExisting(user: Partial<User>) {
    return this.http.get<User>(
      `${this.baseUrl}/${user.name}`
    );
  }

  update(user: Partial<User>) {
    return this.http.get(
      `${this.baseUrl}/${user.name}`
    );
  }

  delete(user: Partial<User>) {
    return this.http.get(
      `${this.baseUrl}/${user.name}`
    );
  }
}

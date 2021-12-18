/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { User } from 'src/models/entities/User';
import { MOCK_USERS } from '../mock/mock-users.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class UsersDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<User> {

  protected items: User[] = MOCK_USERS.map(n => Object.assign(new User(), n));

  constructor() {
    super();
  }

  protected itemExists(user: Partial<User>) {
    return this.items.some(user2 => (user.name === user2.name));
  }

  protected getIndexOfItem(user: Partial<User>) {
    return this.items.findIndex(user2 => (user.name === user2.name));
  }
}

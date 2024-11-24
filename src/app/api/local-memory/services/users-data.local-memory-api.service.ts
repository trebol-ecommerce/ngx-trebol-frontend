/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { User } from 'src/models/entities/User';
import { MOCK_USERS } from '../mock-data/mock-users.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class UsersDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<User> {

  protected items = MOCK_USERS.slice();

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

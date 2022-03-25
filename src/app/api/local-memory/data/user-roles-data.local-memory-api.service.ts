/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { UserRole } from 'src/models/entities/UserRole';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_USER_ROLES } from '../mock/mock-user-roles.datasource';

@Injectable()
export class UserRolesDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<UserRole> {

  protected items = MOCK_USER_ROLES.slice();

  constructor() {
    super();
  }

  protected itemExists(role: Partial<UserRole>) {
    return this.items.some(role2 => (role.name === role2.name));
  }

  protected getIndexOfItem(role: Partial<UserRole>) {
    return this.items.findIndex(role2 => (role.name === role2.name));
  }
}

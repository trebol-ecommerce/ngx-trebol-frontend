// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/entities/User';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_USERS } from './sources/mock-users.datasource';

@Injectable()
export class UsersDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<User> {

  protected items: User[] = MOCK_USERS.map(n => Object.assign(new User(), n));

  constructor() {
    super();
  }
}

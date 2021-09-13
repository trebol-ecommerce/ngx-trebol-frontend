// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from 'src/app/models/entities/UserRole';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';

@Injectable()
export class UserRolesDataHttpApiService
  extends EntityDataHttpApiService<UserRole> {

  constructor(http: HttpClient) {
    super(http, '/user_roles');
  }
}

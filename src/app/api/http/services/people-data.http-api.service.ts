/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'src/models/entities/Person';
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';

@Injectable()
export class PeopleDataHttpApiService
  extends EntityDataHttpApiService<Person> {

  constructor(http: HttpClient) {
    super(http, '/people');
  }
}

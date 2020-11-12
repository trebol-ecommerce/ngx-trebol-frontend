// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/entities/Person';
import { EntityDataApiIService } from '../entity-data-api.iservice';
import { EntityHttpDataApiService } from './entity.http-data-api.aservice';

@Injectable()
export class PeopleHttpDataApiService
  extends EntityHttpDataApiService
  implements Partial<EntityDataApiIService<Person>> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public readById(id: number): Observable<Person> {
    return this.http.get<Person>(
      `${this.baseURI}/person/${id}`
    );
  }

  public readAll(): Observable<Person[]> {
    return this.http.get<Person[]>(
      `${this.baseURI}/people`
    );
  }
}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/entities/Person';
import { EntityCrudIService } from '../entity.crud.iservice';
import { EntityHttpCrudService } from './entity.http-crud.aservice';

@Injectable()
export class PeopleHttpCrudService
  extends EntityHttpCrudService
  implements Partial<EntityCrudIService<Person>> {

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

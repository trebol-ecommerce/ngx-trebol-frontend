/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'src/models/entities/Person';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { environment } from 'src/environments/environment';
import { makeFetchHttpParams } from '../http-api.functions';
import { DataPage } from 'src/models/DataPage';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class PeopleDataHttpApiService
  implements IEntityDataApiService<Person> {

  private readonly baseUrl = `${environment.apiUrls.public}/people`;

  constructor(private http: HttpClient) { }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<Person>>(
      this.baseUrl,
      { params }
    );
  }
}

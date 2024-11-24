/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from 'src/models/entities/UserRole';
import { environment } from 'src/environments/environment';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { makeFetchHttpParams } from '../http-api.functions';
import { DataPage } from 'src/models/DataPage';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class UserRolesDataHttpApiService
  implements IEntityDataApiService<UserRole> {

  private readonly baseUrl = `${environment.apiUrls.data}/user_role`;

  constructor(private http: HttpClient) { }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<UserRole>>(
      this.baseUrl,
      { params }
    );
  }
}

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';
import { environment } from 'src/environments/environment';
import { IAccessApiService } from '../../access-api.iservice';

@Injectable()
export class AccessHttpApiService
  implements IAccessApiService {

  private readonly baseUrl = environment.apiUrls.access;

  constructor(private http: HttpClient) { }

  getAuthorizedAccess() {
    return this.http.get<AuthorizedAccess>(
      this.baseUrl
    );
  }

  getResourceAuthorizedAccess(resource: string) {
    return this.http.get<AuthorizedAccess>(
      `${this.baseUrl}/${resource}`
    );
  }

}

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';
import { environment } from 'src/environments/environment';
import { IAccessApiService } from '../../access-api.iservice';

@Injectable()
export class AccessHttpApiService
  extends HttpApiService
  implements IAccessApiService {

  baseUrl = environment.apiUrls.access;

  constructor(http: HttpClient) {
    super(http);
  }

  public getAuthorizedAccess(): Observable<AuthorizedAccess> {
    return this.http.get<AuthorizedAccess>(
      this.baseUrl
    );
  }

  public getResourceAuthorizedAccess(resource: string): Observable<AuthorizedAccess> {
    return this.http.get<AuthorizedAccess>(
      `${this.baseUrl}/${resource}`
    );
  }

}

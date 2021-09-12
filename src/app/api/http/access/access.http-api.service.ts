// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IAccessApiService } from '../../access-api.iservice';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

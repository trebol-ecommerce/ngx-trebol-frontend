// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { Registration } from 'src/app/models/Registration';
import { environment } from 'src/environments/environment';
import { IRegisterPublicApiService } from '../../register-public-api.iservice copy';

@Injectable()
export class RegisterPublicHttpApiService
  extends HttpApiService
  implements IRegisterPublicApiService {

  baseUrl = `${environment.apiUrls.account}/register`;

  constructor(http: HttpClient) {
    super(http);
  }

  register(userDetails: Registration) {
    return this.http.post<boolean>(
      this.baseUrl,
      userDetails
    );
  }
}

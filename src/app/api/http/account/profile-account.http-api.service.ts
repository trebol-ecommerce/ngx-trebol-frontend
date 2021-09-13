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
import { Person } from 'src/app/models/entities/Person';
import { environment } from 'src/environments/environment';
import { IProfileAccountApiService } from '../../profile-account-api.iservice';

@Injectable()
export class ProfileAccountHttpApiService
  extends HttpApiService
  implements IProfileAccountApiService {

  baseUrl = `${environment.apiUrls.account}/profile`;

  constructor(http: HttpClient) {
    super(http);
  }

  getProfile() {
    return this.http.get<Person>(
      this.baseUrl
    );
  }

  updateProfile(details: Person) {
    return this.http.put<boolean>(
      this.baseUrl,
      details
    );
  }
}

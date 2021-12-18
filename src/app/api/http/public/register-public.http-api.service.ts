/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { Person } from 'src/models/entities/Person';
import { Registration } from 'src/models/Registration';
import { environment } from 'src/environments/environment';
import { IRegisterPublicApiService } from '../../register-public-api.iservice copy';

@Injectable()
export class RegisterPublicHttpApiService
  extends HttpApiService
  implements IRegisterPublicApiService {

  baseUrl = `${environment.apiUrls.public}/register`;

  constructor(http: HttpClient) {
    super(http);
  }

  register(registration: Registration) {
    const payload = {} as any;
    payload.name = registration.name;
    payload.password = registration.password;
    payload.profile = this.shrinkPersonModel(registration.profile);

    return this.http.post<boolean>(
      this.baseUrl,
      payload
    );
  }

  private shrinkPersonModel(source: Person): Partial<Person> {
    const target = { } as any;
    target.idNumber = source.idNumber;
    target.firstName = source.firstName;
    target.lastName = source.lastName;
    target.email = source.email;
    if (source.phone1) {
      target.phone1 = source.phone1;
    }
    if (source.phone2) {
      target.phone2 = source.phone2;
    }
    return target;
  }
}

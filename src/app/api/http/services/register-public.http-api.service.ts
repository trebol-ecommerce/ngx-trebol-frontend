/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'src/models/entities/Person';
import { Registration } from 'src/models/Registration';
import { environment } from 'src/environments/environment';
import { IRegisterPublicApiService } from '../../register-public-api.iservice';

@Injectable()
export class RegisterPublicHttpApiService
  implements IRegisterPublicApiService {

  private readonly baseUrl = `${environment.apiUrls.public}/register`;

  constructor(private http: HttpClient) { }

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

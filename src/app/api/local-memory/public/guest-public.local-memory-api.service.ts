/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from 'src/models/entities/Person';
import { IGuestPublicApiService } from '../../guest-public-api.iservice';

@Injectable()
export class GuestPublicLocalMemoryApiService
  implements IGuestPublicApiService {

  constructor() { }

  guestLogin(details: Person): Observable<string> {
    return of('test');
  }
}

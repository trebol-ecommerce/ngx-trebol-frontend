// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/entities/Person';
import { IGuestPublicApiService } from '../../guest-public-api.iservice';

@Injectable()
export class GuestPublicLocalMemoryApiService
  implements IGuestPublicApiService {

  constructor() { }

  guestLogin(details: Person): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }
}

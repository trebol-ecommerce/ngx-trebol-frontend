// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from 'src/app/models/Registration';
import { IRegisterPublicApiService } from '../../register-public-api.iservice copy';

@Injectable()
export class RegisterPublicLocalMemoryApiService
  implements IRegisterPublicApiService {

  constructor() { }

  register(details: Registration): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }
}

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { makeid } from 'src/functions/makeid';
import { ILoginPublicApiService } from '../../login-public-api.iservice';

@Injectable()
export class LoginPublicLocalMemoryApiService
  implements ILoginPublicApiService {

  constructor() { }

  login() {
    return of(makeid(200));
  }
}

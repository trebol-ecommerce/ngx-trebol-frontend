/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { environment } from 'src/environments/environment';
import { makeid } from 'src/functions/makeid';
import { ILoginPublicApiService } from '../../login-public-api.iservice';

@Injectable()
export class LoginPublicLocalMemoryApiService
  implements ILoginPublicApiService {

  protected readonly sessionStorageTokenItemName = environment.secrets.sessionTokenName;

  constructor() { }

  login(details: Login) {
    return new Observable<void>(
      observer => {
        const token = makeid(200);
        sessionStorage.setItem(this.sessionStorageTokenItemName, token);
        observer.next();
        observer.complete();

        return {
          unsubscribe() { }
        };
      }
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionStorageTokenItemName);
  }
}

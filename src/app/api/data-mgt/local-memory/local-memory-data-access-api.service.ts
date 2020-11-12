// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DataAccessApiIService } from '../data-access.api.iservice';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';
import { sessionStorageTokenItemName } from 'src/environments/auth-api.environment';

@Injectable()
export class LocalMemoryDataAccessApiService
  implements DataAccessApiIService {

  protected readonly sessionStorageTokenItemName = sessionStorageTokenItemName;

  protected returnAsyncIfLoggedIn(obj: any): Observable<any> {
    return new Observable(
      (observer) => {
        if (sessionStorage.getItem(this.sessionStorageTokenItemName) === null) {
          observer.error();
        } else {
          observer.next(obj);
        }
        observer.complete();

        return {
          unsubscribe() {}
        };
      }
    );
  }

  public getResourceAuthorizedAccess(resource: string): Observable<AuthorizedAccess> {
    return this.returnAsyncIfLoggedIn({
      permissions: ['create', 'read', 'update', 'delete']
    });
  }

  public getAuthorizedAccess(): Observable<AuthorizedAccess> {
    return this.returnAsyncIfLoggedIn({
      routes: ['clients', 'products', 'sales', 'sellers', 'users']
    });
  }

}
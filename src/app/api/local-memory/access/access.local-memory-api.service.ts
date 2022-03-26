/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';
import { environment } from 'src/environments/environment';
import { IAccessApiService } from '../../access-api.iservice';

@Injectable()
export class AccessLocalMemoryApiService
  implements IAccessApiService {

  protected readonly sessionStorageTokenItemName = environment.secrets.sessionStorageTokenItem;

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
      routes: ['customers', 'products', 'product_categories', 'product_lists', 'sales', 'salespeople', 'users', 'images', 'shippers']
    });
  }

}

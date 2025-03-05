/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/models/entities/Person';
import { environment } from 'src/environments/environment';
import { IProfileAccountApiService } from '../../profile-account-api.iservice';
import { MOCK_PEOPLE } from '../mock-data/mock-people.datasource';

@Injectable()
export class ProfileAccountLocalMemoryApiService
  implements IProfileAccountApiService {

  protected readonly sessionStorageTokenItemName = environment.secrets.sessionStorageTokenItem;

  constructor() { }

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

  public getProfile(): Observable<Person> {
    return this.returnAsyncIfLoggedIn(MOCK_PEOPLE[0]);
  }

  public updateProfile(details: Person): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }
}

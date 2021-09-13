// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/entities/Person';
import { environment } from 'src/environments/environment';
import { IProfileAccountApiService } from '../../profile-account-api.iservice';

@Injectable()
export class ProfileAccountLocalMemoryApiService
  implements IProfileAccountApiService {

  protected readonly sessionStorageTokenItemName = environment.secrets.sessionTokenName;

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
    return this.returnAsyncIfLoggedIn({
      id: 1,
      name: 'admin',
      idNumber: '1111',
      email: 'text@example.com',
      address: 'example address',
    });
  }

  public updateProfile(details: Person): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }
}

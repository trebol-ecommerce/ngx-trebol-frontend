// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from 'src/app/models/entities/Person';
import { makeid } from 'src/functions/makeid';
import { SessionApiIService } from '../session-api.iservice';
import { Registration } from 'src/app/models/Registration';
import { environment } from 'src/environments/environment';

function getNewSessionId(): number {
  const localSessionId = localStorage.getItem('latestSessionId');
  const sessionId = (localSessionId !== null) ? Number(localSessionId) : 1;
  localStorage.setItem('latestSessionId', String(sessionId + 1));

  return sessionId;
}

@Injectable()
export class LocalMemorySessionApiService
  implements SessionApiIService {

  protected readonly sessionStorageTokenItemName = environment.secrets.sessionTokenName;
  protected readonly authorizationHeader = environment.secrets.authHeader;

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
      idCard: '1111',
      email: 'text@example.com',
      address: 'example address',
    });
  }

  public updateProfile(details: Person): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }

  public guestLogin(details: Person): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }

  public register(details: Registration): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }

  public login(details: any): Observable<boolean> {
    return new Observable(
      observer => {
        if ('name' in details && 'password' in details) {
          const token = makeid(200);
          sessionStorage.setItem(this.sessionStorageTokenItemName, token);
          observer.next(true);
        } else {
          observer.error(new Error('Provided details for new session are invalid'));
        }
        observer.complete();

        return {
          unsubscribe() { }
        };
      }
    );
  }

  public logout(): Observable<boolean> {
    sessionStorage.removeItem(this.sessionStorageTokenItemName);
    return of(true);
  }
}

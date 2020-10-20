// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthorizedAccess } from 'src/app/data/models/AuthorizedAccess';
import { Client } from 'src/app/data/models/entities/Client';
import { Person } from 'src/app/data/models/entities/Person';
import { User } from 'src/app/data/models/entities/User';
import { makeid } from 'src/functions/makeid';
import { AuthenticationIService } from '../auth.iservice';
import { sessionStorageTokenItemName, authorizationHeaderName } from 'src/environments/auth.environment';

function getNewSessionId(): number {
  const localSessionId = localStorage.getItem('latestSessionId');
  const sessionId = (localSessionId !== null) ? Number(localSessionId) : 1;
  localStorage.setItem('latestSessionId', String(sessionId + 1));

  return sessionId;
}

@Injectable()
export class LocalMemoryAuthService
  implements AuthenticationIService {

  protected readonly sessionStorageTokenItemName = sessionStorageTokenItemName;
  protected readonly authorizationHeader = authorizationHeaderName;

  constructor() { }

  public getResourceAuthorizedAccess(resource: string): Observable<AuthorizedAccess> {
    return of({
      permissions: ['create', 'read', 'update', 'delete']
    });
  }
  
  public getAuthorizedAccess(): Observable<AuthorizedAccess> {
    return of({
      routes: ['clients', 'products', 'sales', 'sellers', 'users']
    })
  }

  public getProfile(): Observable<Person> {
    return of({
      id: 1,
      name: "admin",
      idCard: "1111",
      email: "text@example.com",
      address: "example address",
    });
  }
  public updateProfile(details: Person): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }

  public guestLogin(details: Person): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }

  public register(details: Partial<User>): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }

  public login(details: User | Client): Observable<boolean> {
    return new Observable(
      observer => {

        if (details instanceof User || details instanceof Client) {
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
    sessionStorage.removeItem('session');
    return of(true);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/data/models/entities/Client';
import { Person } from 'src/app/data/models/entities/Person';
import { Session } from 'src/app/data/models/entities/Session';
import { User } from 'src/app/data/models/entities/User';
import { makeid } from 'src/functions/makeid';
import { AuthenticationIService } from '../auth.iservice';

function getNewSessionId(): number {
  const localSessionId = localStorage.getItem('latestSessionId');
  const sessionId = (localSessionId !== null) ? Number(localSessionId) : 1;
  localStorage.setItem('latestSessionId', String(sessionId + 1));

  return sessionId;
}

@Injectable()
export class LocalMemoryAuthService
  implements AuthenticationIService {

  constructor() { }

  public getProfile(): Observable<Person> {
    throw new Error('Method not implemented.'); // TODO implement me
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

        if (details instanceof User) {
          const sesion: Session = Object.assign(
            new Session(),
            {
              id: getNewSessionId(),
              openedOn: Date.now().toLocaleString(),
              hash: makeid(10),
              user: details
            }
          );
          sessionStorage.setItem('session', JSON.stringify(sesion));
          observer.next(true);
        } else if (details instanceof Client) {
          const sesion: Session = Object.assign(
            new Session(),
            {
              id: getNewSessionId(),
              openedOn: Date.now().toLocaleString(),
              hash: makeid(10),
              user: { clientId: details.id }
            }
          );
          sessionStorage.setItem('session', JSON.stringify(sesion));
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

  public validate(): Observable<boolean> {
    const hasSession = (sessionStorage.getItem('session') !== null);
    return of(hasSession);
  }

  public logout(): Observable<boolean> {
    sessionStorage.removeItem('session');
    return of(true);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AuthorizedAccess } from 'src/app/data/models/AuthorizedAccess';
import { Person } from 'src/app/data/models/entities/Person';
import { User } from 'src/app/data/models/entities/User';
import { HttpService } from 'src/app/shared/http.abstract-service';
import { environment } from 'src/environments/environment';
import { AuthenticationIService } from '../auth.iservice';

@Injectable()
export class HttpAuthService
  extends HttpService
  implements AuthenticationIService {

  protected readonly sessionStorageTokenItemName = environment.sessionStorageTokenItemName;
  protected readonly authorizationHeader = environment.authorizationHeaderName;
  protected readonly permissionsItemName = environment.permissionsStorageTokenItemName;

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public getProfile(): Observable<Person> {
    return this.http.get<Person>(
      `${this.baseURI}/profile`
    );
  }

  public updateProfile(details: Person): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.baseURI}/profile`,
      details
    );
  }

  public guestLogin(personDetails: Person): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseURI}/guest`,
      personDetails
    );
  }

  public register(userDetails: User): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseURI}/register`,
      userDetails
    );
  }

  public login(details: any): Observable<boolean> {
    return this.http.post(
      `${this.baseURI}/login`,
      details,
      {
        observe: 'response',
        responseType: 'text'
      }
    ).pipe(
      tap(
        response => {
          if (response.headers.has(this.authorizationHeader)) {
            sessionStorage.setItem(this.sessionStorageTokenItemName, response.headers.get(this.authorizationHeader));
            this.getAuthorizedAccess().subscribe();
          }
        }
      ),
      map(
        response => {
          if (response.body) {
            return (response.body === 'true');
          } else {
            return false;
          }
        }
      )
    );
  }

  public validate(): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseURI}/validate`
    ).pipe(
      tap(
        ok => {
          if (!ok) {
            sessionStorage.removeItem(this.sessionStorageTokenItemName);
          }
        }
      )
    );
  }
  
  public getAuthorizedAccess(): Observable<AuthorizedAccess> {
    if (sessionStorage.getItem(this.permissionsItemName)) {
      const routes: string[] = JSON.parse(sessionStorage.getItem(this.permissionsItemName));
      return of({ routes });
    } else {
      return this.http.get<AuthorizedAccess>(
        `${this.baseURI}/api`
      ).pipe(
        tap(
          access => {
            if (access?.routes?.length > 0) {
              sessionStorage.setItem(this.permissionsItemName, JSON.stringify(access.routes));
            }
          }
        )
      );
    }
  }

  public logout(): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseURI}/logout`
    ).pipe(
      finalize(
        () => {
          sessionStorage.removeItem(this.permissionsItemName);
          sessionStorage.removeItem(this.sessionStorageTokenItemName);
        }
      )
    );
  }
}

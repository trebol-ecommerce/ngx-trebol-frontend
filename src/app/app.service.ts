import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, concatMap, finalize, tap } from 'rxjs/operators';
import { AUTH_INJECTION_TOKEN } from 'src/app/auth/auth.injection-token';
import { AuthenticationIService } from 'src/app/auth/auth.iservice';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { Client } from 'src/app/data/models/entities/Client';
import { Person } from 'src/app/data/models/entities/Person';
import { Session } from 'src/app/data/models/entities/Session';
import { User } from 'src/app/data/models/entities/User';
import { Login } from 'src/app/data/models/Login';
import { EntityDataIService } from 'src/app/data/services/entity.data.iservice';

@Injectable({ providedIn: 'root' })
export class AppService
  implements OnDestroy {

  protected session: Session = null;
  protected sessionChangesSource: Subject<Session> = new Subject();
  protected isValidatingSessionSource: Subject<boolean> = new Subject();

  public sessionChanges$: Observable<Session> = this.sessionChangesSource.asObservable();
  public isValidatingSession$: Observable<boolean> = this.isValidatingSessionSource.asObservable();

  constructor(
    @Inject(AUTH_INJECTION_TOKEN) protected authService: AuthenticationIService,
    @Inject(DATA_INJECTION_TOKENS.users) protected usersDataService: EntityDataIService<User>,
    @Inject(DATA_INJECTION_TOKENS.clients) protected clientsDataService: EntityDataIService<Client>
  ) { }

  ngOnDestroy(): void {
    this.sessionChangesSource.complete();
    this.isValidatingSessionSource.complete();
  }

  public getCurrentSession(): Session {
    return this.session;
  }

  public guestLogin(person: Person): Observable<boolean> {
    return this.clientsDataService.create({ id: null, person }).pipe(
      concatMap(this.authService.login)
    );
  }

  public register(details: User): Observable<boolean> {
    return this.usersDataService.create(details).pipe(
      concatMap(this.authService.login)
    );
  }

  public login(credentials: Login): Observable<boolean> {
    if (this.session) {
      return of(true);
    } else {
      return this.usersDataService.readFiltered(credentials).pipe(
        concatMap(
          (users: User[]) => {
            if (users.length > 0) {
              return this.authService.login(users[0]);
            } else {
              return of(null);
            }
          }
        )
      );
    }
  }

  public validateSession(): Observable<boolean> {
    this.isValidatingSessionSource.next(true);

    return this.authService.validate().pipe(
      catchError(() => of(false)),
      finalize(() => { this.isValidatingSessionSource.next(false); }),
      tap(isValid => { if (!isValid) { this.closeCurrentSession(); } })
    );
  }

  public closeCurrentSession(): void {
    this.session = null;
    this.sessionChangesSource.next(null);
    this.authService.logout().subscribe();
  }

}

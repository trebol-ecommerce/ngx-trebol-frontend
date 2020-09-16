import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, concatMap, finalize, tap } from 'rxjs/operators';
import { DATA_INJECTION_TOKENS } from 'src/data/data-injection-tokens';
import { Client } from 'src/data/models/entities/Client';
import { Person } from 'src/data/models/entities/Person';
import { Session } from 'src/data/models/entities/Session';
import { User } from 'src/data/models/entities/User';
import { Login } from 'src/data/models/Login';
import { SessionDataIService } from 'src/data/services/auth.data.iservice';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

@Injectable({ providedIn: 'root' })
export class AppUserService
  implements OnDestroy {

  protected session: Session = null;
  protected sessionChangesSource: Subject<Session> = new Subject();
  protected isValidatingSessionSource: Subject<boolean> = new Subject();

  public sessionChanges$: Observable<Session> = this.sessionChangesSource.asObservable();
  public isValidatingSession$: Observable<boolean> = this.isValidatingSessionSource.asObservable();

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sessions) protected sessionDataService: SessionDataIService,
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
      concatMap(this.sessionDataService.login)
    );
  }

  public register(details: User): Observable<boolean> {
    return this.usersDataService.create(details).pipe(
      concatMap(this.sessionDataService.login)
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
              return this.sessionDataService.login(users[0]);
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

    return this.sessionDataService.validate().pipe(
      catchError(() => of(false)),
      finalize(() => { this.isValidatingSessionSource.next(false); }),
      tap(isValid => { if (!isValid) { this.closeCurrentSession(); } })
    );
  }

  public closeCurrentSession(): void {
    this.session = null;
    this.sessionChangesSource.next(null);
    this.sessionDataService.logout().subscribe();
  }

}

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, concatMap, finalize, map, tap } from 'rxjs/operators';
import { Client } from 'src/data/models/entities/Client';
import { Person } from 'src/data/models/entities/Person';
import { Session } from 'src/data/models/entities/Session';
import { User } from 'src/data/models/entities/User';
import { Login } from 'src/data/models/Login';
import { SessionDataIService } from 'src/data/services/auth.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
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
    @Inject(DATA_INJECTION_TOKENS.people) protected peopleDataService: EntityDataIService<Person>,
    @Inject(DATA_INJECTION_TOKENS.clients) protected clientsDataService: EntityDataIService<Client>
  ) { }

  ngOnDestroy(): void {
    this.sessionChangesSource.complete();
    this.isValidatingSessionSource.complete();
  }

  public getCurrentSession(): Session {
    return this.session;
  }

  public guestLogin(details: Person): Observable<Session> {
    return this.peopleDataService.create(details).pipe(
      concatMap(p => this.clientsDataService.create({ id: null, person: p })),
      concatMap(this.sessionDataService.open),
      map((s) => Object.assign<Session, Partial<Session>>(new Session(), s)),
      tap(
        (s: Session) => {
          this.session = s;
          this.sessionChangesSource.next(s);
        }
      )
    );
  }

  public register(details: User): Observable<Session> {
    return this.usersDataService.create(details).pipe(
      concatMap(this.sessionDataService.open),
      map((s) => Object.assign<Session, Partial<Session>>(new Session(), s)),
      tap(
        (s: Session) => {
          this.session = s;
          this.sessionChangesSource.next(s);
        }
      )
    );
  }

  public login(credentials: Login): Observable<Session> {
    if (this.session) {
      return of(this.session);
    } else {
      return this.usersDataService.readFiltered(credentials).pipe(
        concatMap(
          (users: User[]) => {
            if (users.length > 0) {
              return this.sessionDataService.open(users[0]).pipe(
                tap(
                  (s: Session) => {
                    this.session = s;
                    this.sessionChangesSource.next(s);
                  }
                )
              );
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

    return this.sessionDataService.validate(this.session).pipe(
      catchError(() => of(false)),
      finalize(() => { this.isValidatingSessionSource.next(false); }),
      tap(esValida => { if (!esValida) { this.closeCurrentSession(); } })
    );
  }

  public closeCurrentSession(): void {
    this.session = null;
    this.sessionChangesSource.next(null);
    this.sessionDataService.close(this.session).subscribe();
  }

}

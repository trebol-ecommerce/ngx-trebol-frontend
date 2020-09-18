import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AUTH_INJECTION_TOKEN } from 'src/app/auth/auth.injection-token';
import { AuthenticationIService } from 'src/app/auth/auth.iservice';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityDataIService } from 'src/app/data/entity.data.iservice';
import { Client } from 'src/app/data/models/entities/Client';
import { Person } from 'src/app/data/models/entities/Person';
import { User } from 'src/app/data/models/entities/User';
import { Login } from 'src/app/data/models/Login';

@Injectable({ providedIn: 'root' })
export class AppService
  implements OnDestroy {

  protected isLoggedIn: boolean = false;
  protected isLoggedInChangesSource: Subject<boolean>= new BehaviorSubject(false);
  protected isValidatingSessionSource: Subject<boolean> = new Subject();

  public isLoggedInChanges$: Observable<boolean> = this.isLoggedInChangesSource.asObservable();
  public isValidatingSession$: Observable<boolean> = this.isValidatingSessionSource.asObservable();

  constructor(
    @Inject(AUTH_INJECTION_TOKEN) protected authService: AuthenticationIService,
    @Inject(DATA_INJECTION_TOKENS.users) protected usersDataService: EntityDataIService<User>,
    @Inject(DATA_INJECTION_TOKENS.clients) protected clientsDataService: EntityDataIService<Client>
  ) { }

  ngOnDestroy(): void {
    this.isLoggedInChangesSource.complete();
    this.isValidatingSessionSource.complete();
  }

  public isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  public guestLogin(personDetails: Person): Observable<boolean> {
    return this.authService.guestLogin(personDetails);
  }

  public register(userDetails: User): Observable<boolean> {
    return this.authService.register(userDetails).pipe(
      tap( //TODO refactor this tap
        success => {
          this.isLoggedInChangesSource.next(true);
        }
      )
    );
  }

  public login(credentials: Login): Observable<boolean> {
    if (this.isLoggedIn) {
      return of(true);
    } else {
      return this.authService.login(credentials).pipe(
        tap( //TODO and this tap too
          success => {
            this.isLoggedInChangesSource.next(true);
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

  public getUserProfile(): Observable<Person> {
    return this.authService.getProfile();
  }

  public updateUserProfile(details: Person): Observable<boolean> {
    return this.authService.updateProfile(details);
  }

  public closeCurrentSession(): void {
    this.isLoggedIn = false;
    this.isLoggedInChangesSource.next(false);
    this.authService.logout().subscribe();
  }

}

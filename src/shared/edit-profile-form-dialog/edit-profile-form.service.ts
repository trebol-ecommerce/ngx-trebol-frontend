import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, concat, iif, Observable, of, Subject } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { Person } from 'src/data/models/entities/Person';
import { DATA_INJECTION_TOKENS } from 'src/data/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

@Injectable()
export class EditProfileFormService
  implements OnDestroy {

  protected savingSource: Subject<boolean> = new BehaviorSubject(false);
  protected confirmCancelSource: Subject<boolean> = new BehaviorSubject(false);

  public saving$: Observable<boolean> = this.savingSource.asObservable();
  public confirmCancel$: Observable<boolean>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.people) protected peopleDataService: EntityDataIService<Person>,
    protected appUserService: AppUserService
  ) {
    this.confirmCancel$ = this.confirmCancelSource.asObservable().pipe(
      switchMap(
        (v) => iif(
          () => !!v,
          concat(
            of(true),
            of(false).pipe(delay(2000))
          ),
          of(false)
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.confirmCancelSource.complete();
    this.savingSource.complete();
  }

  public loadProfile(): Observable<Person> {
    return new Observable(
      (observer) => {
        const personId = this.appUserService.getCurrentSession().user.person.id;

        return this.peopleDataService.readById(personId).subscribe(
          person => {
            observer.next(person);
            observer.complete();
          }
        );
      }
    );
  }

  public saveProfile(p: Person): Observable<boolean> {
    this.savingSource.next(true);
    return this.peopleDataService.update(p, p.id).pipe(
      catchError(() => of(null)),
      tap(() => { this.savingSource.next(false); }),
      map(p => !!(p))
    );
  }

  public confirmCancel() {
    this.confirmCancelSource.next(true);
  }
}

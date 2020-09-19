import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, concat, iif, Observable, of, Subject } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { Person } from 'src/app/data/models/entities/Person';

@Injectable()
export class EditProfileFormService
  implements OnDestroy {

  protected savingSource: Subject<boolean> = new BehaviorSubject(false);
  protected confirmCancelSource: Subject<boolean> = new BehaviorSubject(false);

  public saving$: Observable<boolean> = this.savingSource.asObservable();
  public confirmCancel$: Observable<boolean>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.people) protected peopleDataService: EntityCrudIService<Person>,
    protected appService: AppService
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
    return this.appService.getUserProfile();
  }

  public saveProfile(p: Person): Observable<boolean> {
    this.savingSource.next(true);
    return this.appService.updateUserProfile(p).pipe(
      tap(() => { this.savingSource.next(false); }),
    );
  }

  public confirmCancel() {
    this.confirmCancelSource.next(true);
  }
}

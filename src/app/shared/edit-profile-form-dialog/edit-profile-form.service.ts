// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, concat, iif, Observable, of, Subject } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { Person } from 'src/app/data/models/entities/Person';

@Injectable()
export class EditProfileFormService
  implements OnDestroy {

  protected savingSource: Subject<boolean> = new BehaviorSubject(false);
  protected confirmCancelSource: Subject<boolean> = new BehaviorSubject(false);

  public saving$: Observable<boolean> = this.savingSource.asObservable();
  public confirmCancel$: Observable<boolean>;

  constructor(
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

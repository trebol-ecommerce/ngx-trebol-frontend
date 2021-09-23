/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, concat, iif, Observable, of, Subject } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { Person } from 'src/app/models/entities/Person';

@Injectable({ providedIn: 'root' })
export class EditProfileFormService
  implements OnDestroy {

  private savingSource: Subject<boolean> = new BehaviorSubject(false);
  private confirmCancelSource: Subject<boolean> = new BehaviorSubject(false);

  saving$: Observable<boolean> = this.savingSource.asObservable();
  confirmCancel$: Observable<boolean>;

  constructor(
    private appService: AppService
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

  loadProfile(): Observable<Person> {
    return this.appService.getUserProfile();
  }

  saveProfile(p: Person): Observable<boolean> {
    this.savingSource.next(true);
    return this.appService.updateUserProfile(p).pipe(
      tap(() => { this.savingSource.next(false); }),
    );
  }

  confirmCancel() {
    this.confirmCancelSource.next(true);
  }
}

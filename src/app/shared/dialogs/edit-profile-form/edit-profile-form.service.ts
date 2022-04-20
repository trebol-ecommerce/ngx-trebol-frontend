/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, concat, iif, Observable, of, Subject } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { ProfileService } from 'src/app/profile.service';
import { Person } from 'src/models/entities/Person';

@Injectable({ providedIn: 'root' })
export class EditProfileFormService {

  private savingSource: Subject<boolean> = new BehaviorSubject(false);
  private confirmCancelSource: Subject<boolean> = new BehaviorSubject(false);

  saving$: Observable<boolean> = this.savingSource.asObservable();
  confirmCancel$: Observable<boolean>;

  constructor(
    private profileService: ProfileService
  ) {
    // TODO simplify this observable
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

  loadProfile(): Observable<Person> {
    return this.profileService.getUserProfile();
  }

  saveProfile(p: Person): Observable<boolean> {
    this.savingSource.next(true);
    return this.profileService.updateUserProfile(p).pipe(
      tap(() => { this.savingSource.next(false); }),
    );
  }

  confirmCancel() {
    this.confirmCancelSource.next(true);
  }
}

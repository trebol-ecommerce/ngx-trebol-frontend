/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, ignoreElements, map, share, switchMap, take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { Person } from 'src/models/entities/Person';
import { IProfileAccountApiService } from './api/profile-account-api.iservice';
import { SessionService } from './session.service';

/**
 * Caches user data
 */
@Injectable({ providedIn: 'root' })
export class ProfileService {

  private userProfileSource = new BehaviorSubject<Person>(null);

  constructor(
    @Inject(API_INJECTION_TOKENS.accountProfile) private profileApiService: IProfileAccountApiService,
    private sessionService: SessionService
  ) { }

  getUserProfile(force = false): Observable<Person> {
    return this.sessionService.userHasActiveSession$.pipe(
      switchMap(hasActiveSession => (hasActiveSession ?
        ((force || !!this.userProfileSource.value) ?
          this.userProfileSource.asObservable() :
          this.profileApiService.getProfile().pipe(
            tap(
              profile => { this.userProfileSource.next(profile); },
              err => { this.userProfileSource.next(null); }
            )
          )
        ) :
        of(undefined).pipe(
          tap(() => { this.userProfileSource.next(undefined); })
        )
      )),
      take(1)
    );
  }

  updateUserProfile(details: Person) {
    return this.sessionService.userHasActiveSession$.pipe(
      filter(hasActiveSession => !!hasActiveSession),
      switchMap(() => this.profileApiService.updateProfile(details)),
      tap(() => { this.userProfileSource.next(details); }),
      map(() => (void 0))
    );
  }

  watchUserName() {
    return this.userProfileSource.asObservable().pipe(
      map(p => {
        if (!!p && p?.firstName) {
          return p.firstName;
        } else if (p === null) {
          return $localize`:guest|Label to indicate a guest user:Guest`;
        } else {
          return '';
        }
      }),
      share()
    );
  }

}

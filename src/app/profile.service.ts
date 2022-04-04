/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, share, switchMap, take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { Person } from 'src/models/entities/Person';
import { IProfileAccountApiService } from './api/profile-account-api.iservice';
import { SessionService } from './session.service';

/**
 * Caches user data
 */
@Injectable({ providedIn: 'root' })
export class ProfileService
  implements OnDestroy {

  private userProfileSource = new BehaviorSubject<Person>(null);

  userName$ = this.getUserNameObservable();

  constructor(
    @Inject(API_INJECTION_TOKENS.accountProfile) private profileApiService: IProfileAccountApiService,
    private sessionService: SessionService
  ) { }

  ngOnDestroy(): void {
    this.userProfileSource.complete();
  }

  getUserProfile(): Observable<Person> {
    return this.sessionService.userHasActiveSession$.pipe(
      take(1),
      switchMap(hasActiveSession => (hasActiveSession ?
        (!!this.userProfileSource.value ?
          this.userProfileSource.asObservable().pipe(take(1)) :
          this.profileApiService.getProfile().pipe(
            tap(profile => { this.userProfileSource.next(profile); })
          )
        ) :
        of(null).pipe(
          tap(() => { this.userProfileSource.next(null); })
        )
      ))
    );
  }

  updateUserProfile(details: Person) {
    return this.sessionService.userHasActiveSession$.pipe(
      take(1),
      filter(hasActiveSession => !!hasActiveSession),
      switchMap(() => this.profileApiService.updateProfile(details)),
      tap(() => { this.userProfileSource.next(details); })
    );
  }

  private getUserNameObservable() {
    return this.userProfileSource.asObservable().pipe(
      map(p => (p?.firstName || '')),
      share()
    );
  }

}

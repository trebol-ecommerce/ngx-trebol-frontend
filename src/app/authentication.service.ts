/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { concat, of, Subject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ILoginPublicApiService } from 'src/app/api/login-public-api.iservice';
import { Person } from 'src/models/entities/Person';
import { Login } from 'src/models/Login';
import { Registration } from '../models/Registration';
import { IGuestPublicApiService } from './api/guest-public-api.iservice';
import { IRegisterPublicApiService } from './api/register-public-api.iservice';
import { SessionService } from './session.service';

/**
 * Exposes methods to authenticate the user against the external API, and a simple call to stop any ongoing authentication
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private authCancelationSource = new Subject<void>();

  authCancelation$ = this.authCancelationSource.asObservable();

  constructor(
    @Inject(API_INJECTION_TOKENS.login) private loginApiService: ILoginPublicApiService,
    @Inject(API_INJECTION_TOKENS.guest) private guestApiService: IGuestPublicApiService,
    @Inject(API_INJECTION_TOKENS.register) private registerApiService: IRegisterPublicApiService,
    private sessionService: SessionService
  ) { }

  cancelAuthentication(): void {
    this.authCancelationSource.next();
  }

  guestLogin(personDetails: Person) {
    return this.sessionService.userHasActiveSession$.pipe(
      take(1),
      switchMap(hasActiveSession => (hasActiveSession ?
        of('') :
        this.guestApiService.guestLogin(personDetails).pipe(
          tap(token => this.sessionService.saveToken(token)),
          switchMap(token => concat(
            this.sessionService.validateSession(),
            of(token)
          ))
        )
      ))
    );
  }

  register(userDetails: Registration) {
    return this.sessionService.userHasActiveSession$.pipe(
      take(1),
      switchMap(() => this.registerApiService.register(userDetails)),
      switchMap(() => this.loginApiService.login({
        name: userDetails.name,
        password: userDetails.password
      })),
      tap(token => this.sessionService.saveToken(token)),
      switchMap(token => concat(
        this.sessionService.validateSession(),
        of(token)
      ))
    );
  }

  /**
   *
   * @param credentials Object with valid user credentials
   * @returns A session token, or empty if one is already stored
   */
  login(credentials: Login) {
    return this.sessionService.userHasActiveSession$.pipe(
      take(1),
      switchMap(hasActiveSession => (!hasActiveSession ?
        this.loginApiService.login(credentials).pipe(
          tap(token => this.sessionService.saveToken(token)),
          switchMap(token => concat(
            this.sessionService.validateSession(),
            of(token)
          ))
        ) :
        of('')
      ))
    );
  }

}

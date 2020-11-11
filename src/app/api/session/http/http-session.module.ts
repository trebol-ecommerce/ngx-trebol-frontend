// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AUTH_INJECTION_TOKEN } from '../auth.injection-token';
import { HttpSessionService } from './http-session.service';
import { HttpSessionInterceptor } from './http-session.interceptor';

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    { provide: AUTH_INJECTION_TOKEN, useClass: HttpSessionService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpSessionInterceptor, multi: true }
  ]
})
export class HttpSessionModule { }

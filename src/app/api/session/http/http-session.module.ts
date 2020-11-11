// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
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
    { provide: API_SERVICE_INJECTION_TOKENS.auth, useClass: HttpSessionService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpSessionInterceptor, multi: true }
  ]
})
export class HttpSessionModule { }

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { SessionHttpApiService } from './session/session.http-api.service';
import { SessionHttpApiInterceptor } from './session/session.http-api.interceptor';

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.auth, useClass: SessionHttpApiService },
    { provide: HTTP_INTERCEPTORS, useClass: SessionHttpApiInterceptor, multi: true }
  ]
})
export class HttpSessionApiModule { }

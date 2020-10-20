// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { AUTH_INJECTION_TOKEN } from '../auth.injection-token';
import { LocalMemoryAuthService } from './local-memory-auth.service';

@NgModule({
  providers: [
    { provide: AUTH_INJECTION_TOKEN, useClass: LocalMemoryAuthService }
  ]
})
export class LocalMemoryAuthModule { }

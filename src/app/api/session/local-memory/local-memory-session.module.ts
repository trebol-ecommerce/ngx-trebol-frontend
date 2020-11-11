// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { AUTH_INJECTION_TOKEN } from '../auth.injection-token';
import { LocalMemorySessionService } from './local-memory-session.service';

@NgModule({
  providers: [
    { provide: AUTH_INJECTION_TOKEN, useClass: LocalMemorySessionService }
  ]
})
export class LocalMemorySessionModule { }

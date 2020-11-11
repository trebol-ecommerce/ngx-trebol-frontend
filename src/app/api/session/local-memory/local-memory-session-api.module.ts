// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { LocalMemorySessionApiService } from './local-memory-session-api.service';

@NgModule({
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.auth, useClass: LocalMemorySessionApiService }
  ]
})
export class LocalMemorySessionApiModule { }

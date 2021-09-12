// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { SessionLocalMemoryApiService } from './session/session.local-memory-api.service';

@NgModule({
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.auth, useClass: SessionLocalMemoryApiService }
  ]
})
export class LocalMemorySessionApiModule { }

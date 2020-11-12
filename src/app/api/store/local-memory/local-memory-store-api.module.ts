// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { LocalMemoryStoreApiService } from './local-memory-store-api.service';

/**
 * Provides services that read and write data using the client's working memory
 */
@NgModule({
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.store, useClass: LocalMemoryStoreApiService }
  ]
})
export class LocalMemoryStoreApiModule { }

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NgModule } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { HttpStoreApiService } from './http-store-api.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * Provides services that read and write data using an external HTTP server (defined in the environment files)
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    { provide: API_SERVICE_INJECTION_TOKENS.store, useClass: HttpStoreApiService }
  ]
})
export class HttpStoreApiModule { }

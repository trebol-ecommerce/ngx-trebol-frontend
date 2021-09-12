// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';

export abstract class HttpApiService {
  protected baseUrl?: string;
  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
}

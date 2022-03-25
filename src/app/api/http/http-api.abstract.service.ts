/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';

export abstract class HttpApiService {
  protected baseUrl?: string;

  constructor(protected http: HttpClient) { }
}

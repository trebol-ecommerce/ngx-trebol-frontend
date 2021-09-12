// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpApiService } from './http-api.abstract.service';

export abstract class EntityDataHttpApiService
  extends HttpApiService {

  baseUrl = environment.apiUrls.data;

  constructor(http: HttpClient) {
    super(http);
  }
}

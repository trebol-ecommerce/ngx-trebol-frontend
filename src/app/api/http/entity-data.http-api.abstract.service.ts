// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpService } from 'src/app/shared/http.aservice';
import { environment } from 'src/environments/environment';

export abstract class EntityDataHttpApiService
  extends HttpService {

  protected baseURI = environment.apiUrls.data;
}

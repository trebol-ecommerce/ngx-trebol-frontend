// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpService } from 'src/app/shared/http.aservice';
import { dataApiURL } from 'src/environments/data-api.environment';

export abstract class HttpDataApiService
  extends HttpService {

  protected baseURI = `${dataApiURL}/data`;
}

// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpService } from 'src/app/shared/http.abstract-service';
import { baseURI } from 'src/environments/data.environment';

export abstract class EntityHttpCrudService
  extends HttpService {

  protected baseURI = `${baseURI}/api`;
}

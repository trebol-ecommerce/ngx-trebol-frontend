// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpService } from 'src/app/shared/http.abstract-service';
import { environment } from 'src/environments/environment';

export abstract class EntityHttpCrudService
  extends HttpService {

  protected baseURI = `${environment.baseURI}/api`;
}

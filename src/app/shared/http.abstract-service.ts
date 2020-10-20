// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * A service that uses HttpClient
 */
export abstract class HttpService {
  /**
   * Base resource URI
   */
  protected baseURI = environment.baseURI;

  /**
   * Syntactic sugar - create wrapped httpParams object - use directly as argument in http request
   */
  protected httpParamsOf(object: any): { params: HttpParams } {
    return {
      params: new HttpParams({ fromObject: object })
    };
  }
}

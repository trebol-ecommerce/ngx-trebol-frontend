/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { Login } from '../../models/Login';

export interface ILoginPublicApiService {
  /**
   *
   * @param details The credentials to log in with
   * @returns An observable that will emit a session token or error out.
   */
  login(details: Login): Observable<string>;
}

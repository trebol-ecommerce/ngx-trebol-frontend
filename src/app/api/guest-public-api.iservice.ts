/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { Person } from 'src/models/entities/Person';

export interface IGuestPublicApiService {
  /**
   *
   * @param details Personal information to identify with
   * @returns An observable that will emit a session token or error out.
   */
  guestLogin(details: Person): Observable<string>;
}

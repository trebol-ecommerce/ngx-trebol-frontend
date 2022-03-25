/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';

export interface IAccessApiService {
  getAuthorizedAccess(): Observable<AuthorizedAccess>;
  getResourceAuthorizedAccess(resource: string): Observable<AuthorizedAccess>;
}

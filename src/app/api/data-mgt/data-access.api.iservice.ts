// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';

export interface DataAccessApiIService {
  getAuthorizedAccess(): Observable<AuthorizedAccess>;
  getResourceAuthorizedAccess(resource: string): Observable<AuthorizedAccess>;
}

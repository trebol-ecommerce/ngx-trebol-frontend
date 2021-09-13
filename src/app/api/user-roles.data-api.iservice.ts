// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { UserRole } from 'src/app/models/entities/UserRole';

export interface IUserRolesDataApiService {
  readAllUserRoles(): Observable<UserRole[]>;
}

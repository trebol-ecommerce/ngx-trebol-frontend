/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { Person } from 'src/models/entities/Person';

export interface IProfileAccountApiService {
  getProfile(): Observable<Person>;
  updateProfile(details: Partial<Person>): Observable<any>;
}

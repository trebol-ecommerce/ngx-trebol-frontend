/*
 * Copyright (c) 2021 The Trébol eCommerce Project
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

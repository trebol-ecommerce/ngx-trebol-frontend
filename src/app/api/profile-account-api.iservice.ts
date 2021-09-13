// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { Person } from 'src/app/models/entities/Person';

export interface IProfileAccountApiService {
  getProfile(): Observable<Person>;
  updateProfile(details: Partial<Person>): Observable<any>;
}

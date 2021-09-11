// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { Person } from 'src/app/models/entities/Person';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';
import { Registration } from 'src/app/models/Registration';

export interface SessionApiIService {

  guestLogin(details: Person): Observable<boolean>;
  register(details: Registration): Observable<boolean>;
  login(details: any): Observable<boolean>;
  getProfile(): Observable<Person>;
  updateProfile(details: Person): Observable<boolean>;
  logout(): Observable<boolean>;
}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { Login } from '../models/Login';

export interface ILoginPublicApiService {
  login(details: Login): Observable<any>;
  logout(): void;
}

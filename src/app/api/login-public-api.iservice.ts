/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { Login } from '../models/Login';

export interface ILoginPublicApiService {
  login(details: Login): Observable<any>;
  logout(): void;
}

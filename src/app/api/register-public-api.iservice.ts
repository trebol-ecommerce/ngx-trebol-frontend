/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { Registration } from 'src/models/Registration';

export interface IRegisterPublicApiService {
  register(details: Registration): Observable<any>;
}

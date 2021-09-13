// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { Registration } from 'src/app/models/Registration';

export interface IRegisterPublicApiService {
  register(details: Registration): Observable<any>;
}

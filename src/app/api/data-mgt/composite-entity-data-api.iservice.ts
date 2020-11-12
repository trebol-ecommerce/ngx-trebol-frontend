// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { EntityDataApiIService } from './entity-data-api.iservice';
import { AbstractEntity } from 'src/app/models/AbstractEntity';

export interface CompositeEntityDataApiIService<T extends AbstractEntity, X extends AbstractEntity>
  extends EntityDataApiIService<T> {

  readDetailsById(id: number): Observable<X[]>;
}

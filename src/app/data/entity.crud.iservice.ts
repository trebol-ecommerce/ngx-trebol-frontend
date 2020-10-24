// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { EntityDataIService } from './entity.data.iservice';
import { AbstractEntity } from './models/AbstractEntity';

export interface EntityCrudIService<T extends AbstractEntity>
  extends EntityDataIService<T> {

  create(emp: T): Observable<number>;
  readById(id: number | string): Observable<T>;
  readAll(): Observable<T[]>;
  readFiltered?(f: any): Observable<T[]>;
  update(emp: T, id: number | string): Observable<number>;
  deleteById(id: number | string): Observable<boolean>;
}

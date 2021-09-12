// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { AbstractEntity } from 'src/app/models/AbstractEntity';

export interface IEntityDataApiService<T extends AbstractEntity> {

  create(instance: T): Observable<number>;
  readById(id: number | string): Observable<T>;
  readAll(): Observable<T[]>;
  readFiltered?(f: any): Observable<T[]>;
  update(instance: T, id: number | string): Observable<number>;
  deleteById(id: number | string): Observable<boolean>;
}

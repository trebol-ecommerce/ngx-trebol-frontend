// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { AbstractEntity } from 'src/app/models/AbstractEntity';
import { DataPage } from '../models/DataPage';

export interface IEntityDataApiService<T extends AbstractEntity> {

  create?(instance: T): Observable<void>;
  readById(id: number | string): Observable<T>;
  readAll(): Observable<DataPage<T>>;
  readFiltered?(f: any): Observable<DataPage<T>>;
  update?(instance: T, id: number | string): Observable<void>;
  deleteById?(id: number | string): Observable<void>;
}

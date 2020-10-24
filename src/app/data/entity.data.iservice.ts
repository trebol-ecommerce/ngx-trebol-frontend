// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { AbstractEntity } from './models/AbstractEntity';

export interface EntityDataIService<T extends AbstractEntity> {
  readById(id: number | string): Observable<T>;
  readAll(): Observable<T[]>;
  readFiltered?(f: any): Observable<T[]>;
}
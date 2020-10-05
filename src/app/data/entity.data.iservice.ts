import { Observable } from 'rxjs';
import { AbstractEntity } from './models/AbstractEntity';

export interface EntityDataIService<T extends AbstractEntity> {
  readById(id: number | string): Observable<T>;
  readAll(): Observable<T[]>;
  readFiltered?(f: any): Observable<T[]>;
}
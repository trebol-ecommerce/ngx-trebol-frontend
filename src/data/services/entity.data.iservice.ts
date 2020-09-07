import { Observable } from 'rxjs';

export interface EntityDataIService<T> {

  create(emp: T): Observable<number>;
  readById(id: number | string): Observable<T>;
  readAll(): Observable<T[]>;
  readFiltered(f: any): Observable<T[]>;
  update(emp: T, id: number | string): Observable<number>;
  deleteById(id: number | string): Observable<boolean>;
}

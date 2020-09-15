import { Observable } from 'rxjs';

export interface SessionDataIService {

  login(details: any): Observable<boolean>;
  validate(): Observable<boolean>;
  logout(): Observable<boolean>;
}

import { Observable } from 'rxjs';

export interface AuthenticationIService {

  login(details: any): Observable<boolean>;
  validate(): Observable<boolean>;
  logout(): Observable<boolean>;
}

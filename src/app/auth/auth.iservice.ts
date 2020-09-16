import { Observable } from 'rxjs';

export interface AuthenticationIService {

  guestLogin(details: any): Observable<boolean>;
  register(details: any): Observable<boolean>;
  login(details: any): Observable<boolean>;
  validate(): Observable<boolean>;
  logout(): Observable<boolean>;
}

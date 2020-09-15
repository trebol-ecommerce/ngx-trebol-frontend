import { Observable } from 'rxjs';
import { Session } from 'src/data/models/entities/Session';

export interface SessionDataIService {

  login(details: any): Observable<Session>;
  validate(ssn: Partial<Session>): Observable<boolean>;
  logout(ssn: Partial<Session>): Observable<boolean>;
}

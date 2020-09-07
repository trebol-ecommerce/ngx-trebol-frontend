import { Observable } from 'rxjs';
import { Session } from 'src/data/models/entities/Session';

export interface SessionDataIService {

  open(details: any): Observable<Session>;
  validate(ssn: Partial<Session>): Observable<boolean>;
  close(ssn: Partial<Session>): Observable<boolean>;
}

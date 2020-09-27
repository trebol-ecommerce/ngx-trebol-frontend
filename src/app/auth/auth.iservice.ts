import { Observable } from 'rxjs';
import { Person } from '../data/models/entities/Person';
import { User } from '../data/models/entities/User';
import { AuthorizedAccess } from '../data/models/AuthorizedAccess';

export interface AuthenticationIService {

  guestLogin(details: Person): Observable<boolean>;
  register(details: Partial<User>): Observable<boolean>;
  login(details: any): Observable<boolean>;
  validate(): Observable<boolean>;
  getAuthorizedAccess(): Observable<AuthorizedAccess>;
  getProfile(): Observable<Person>;
  updateProfile(details: Person): Observable<boolean>;
  logout(): Observable<boolean>;
}

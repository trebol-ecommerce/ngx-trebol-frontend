import { Observable } from 'rxjs';
import { Person } from '../data/models/entities/Person';
import { User } from '../data/models/entities/User';

export interface AuthenticationIService {

  guestLogin(details: Person): Observable<boolean>;
  register(details: Partial<User>): Observable<boolean>;
  login(details: any): Observable<boolean>;
  validate(): Observable<boolean>;
  getProfile(): Observable<Person>;
  updateProfile(details: Person): Observable<boolean>;
  logout(): Observable<boolean>;
}

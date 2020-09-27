import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DATA_INJECTION_TOKENS } from '../../../data/data-injection-tokens';
import { EntityCrudIService } from '../../../data/entity.crud.iservice';
import { User } from '../../../data/models/entities/User';

@Injectable({ providedIn: 'root' })
export class UserManagerResolver
  implements Resolve<User[]> {
  
  constructor(
    @Inject(DATA_INJECTION_TOKENS.users) protected dataService: EntityCrudIService<User>
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]>|Promise<User[]>|User[] {
    return this.dataService.readAll();
  }
}

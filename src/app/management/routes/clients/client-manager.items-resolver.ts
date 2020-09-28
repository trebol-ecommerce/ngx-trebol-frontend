import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DATA_INJECTION_TOKENS } from '../../../data/data-injection-tokens';
import { EntityCrudIService } from '../../../data/entity.crud.iservice';
import { Client } from '../../../data/models/entities/Client';

@Injectable({ providedIn: 'root' })
export class ClientManagerItemsResolver
  implements Resolve<Client[]> {
  
  constructor(
    @Inject(DATA_INJECTION_TOKENS.clients) protected dataService: EntityCrudIService<Client>
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client[]>|Promise<Client[]>|Client[] {
    return this.dataService.readAll();
  }
}

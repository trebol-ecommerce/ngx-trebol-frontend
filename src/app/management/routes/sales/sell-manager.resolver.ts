import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DATA_INJECTION_TOKENS } from '../../../data/data-injection-tokens';
import { EntityCrudIService } from '../../../data/entity.crud.iservice';
import { Sell } from '../../../data/models/entities/Sell';

@Injectable({ providedIn: 'root' })
export class SellManagerResolver
  implements Resolve<Sell[]> {
  
  constructor(
    @Inject(DATA_INJECTION_TOKENS.sales) protected dataService: EntityCrudIService<Sell>
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Sell[]>|Promise<Sell[]>|Sell[] {
    return this.dataService.readAll();
  }
}

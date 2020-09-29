import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DATA_INJECTION_TOKENS } from '../../../data/data-injection-tokens';
import { EntityCrudIService } from '../../../data/entity.crud.iservice';
import { Seller } from '../../../data/models/entities/Seller';

@Injectable({ providedIn: 'root' })
export class SellerManagerItemsResolver
  implements Resolve<Seller[]> {
  
  constructor(
    @Inject(DATA_INJECTION_TOKENS.sellers) protected dataService: EntityCrudIService<Seller>
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Seller[]>|Promise<Seller[]>|Seller[] {
    return this.dataService.readAll();
  }
}

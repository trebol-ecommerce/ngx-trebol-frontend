import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DATA_INJECTION_TOKENS } from '../../../data/data-injection-tokens';
import { EntityCrudIService } from '../../../data/entity.crud.iservice';
import { Product } from '../../../data/models/entities/Product';

@Injectable({ providedIn: 'root' })
export class ProductManagerResolver
  implements Resolve<Product[]> {
  
  constructor(
    @Inject(DATA_INJECTION_TOKENS.products) protected dataService: EntityCrudIService<Product>
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]>|Promise<Product[]>|Product[] {
    return this.dataService.readAll();
  }
}

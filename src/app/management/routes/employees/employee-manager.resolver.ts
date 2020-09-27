import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DATA_INJECTION_TOKENS } from '../../../data/data-injection-tokens';
import { EntityCrudIService } from '../../../data/entity.crud.iservice';
import { Employee } from '../../../data/models/entities/Employee';

@Injectable({ providedIn: 'root' })
export class EmployeeManagerResolver
  implements Resolve<Employee[]> {
  
  constructor(
    @Inject(DATA_INJECTION_TOKENS.employees) protected dataService: EntityCrudIService<Employee>
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Employee[]>|Promise<Employee[]>|Employee[] {
    return this.dataService.readAll();
  }
}

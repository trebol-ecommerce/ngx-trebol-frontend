import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Sell } from 'src/app/data/models/entities/Sell';
import { SellDetail } from 'src/app/data/models/entities/SellDetail';
import { CompositeEntityCrudIService } from '../composite-entity.crud.iservice';
import { EntityLocalMemoryDataService } from './entity.local-memory-data.aservice';

export const MOCK_SALES: Partial<Sell>[] = [
  {
    id: 1,
    soldOn: '2020-06-16',
    employee: { id: 1, role: { id: 1 } },
    details: [
      { id: 1, product: { id: 1 }, units: 4 },
      { id: 2, product: { id: 2 }, units: 1 },
    ]
  },
  {
    id: 2,
    soldOn: '2020-06-18',
    employee: { id: 1, role: { id: 1 } },
    details: [
      { id: 3, product: { id: 3 }, units: 2 },
    ]
  },
  {
    id: 3,
    soldOn: '2020-06-18',
    employee: { id: 1, role: { id: 1 } },
    details: [
      { id: 4, product: { id: 2 }, units: 1 },
    ]
  }
];

@Injectable()
export class SalesLocalMemoryDataService
  extends EntityLocalMemoryDataService<Sell>
  implements CompositeEntityCrudIService<Sell, SellDetail> {

  protected items: Sell[] = MOCK_SALES.map(n => Object.assign(new Sell(), n));

  constructor() {
    super();
  }

  public readDetailsById(id: number): Observable<SellDetail[]> {
    return this.readById(id).pipe(
      map(s => s.details)
    );
  }
}

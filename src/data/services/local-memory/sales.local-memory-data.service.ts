import { Injectable } from '@angular/core';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { CompositeEntityDataIService } from '../composite-entity.data.iservice';
import { Observable, of } from 'rxjs';

export const MOCK_SALES: Partial<Sell>[] = [
  {
    id: 1,
    soldOn: '2020-06-16',
    employee: { id: 1, role: { id: 1 } }
  }
];

@Injectable()
export class SalesLocalMemoryDataService
  extends EntityLocalMemoryDataService<Sell>
  implements CompositeEntityDataIService<Sell, SellDetail> {

  protected items: Sell[] = MOCK_SALES.map(n => Object.assign(new Sell(), n));

  constructor() {
    super();
  }

  public readDetailsById(id: number): Observable<SellDetail[]> {
    return of([]);
  }
}

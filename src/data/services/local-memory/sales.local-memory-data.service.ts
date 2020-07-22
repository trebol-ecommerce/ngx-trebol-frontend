import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { CompositeEntityDataIService } from '../composite-entity.data.iservice';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';

export const MOCK_SALES: Partial<Sell>[] = [
  {
    id: 1,
    soldOn: '2020-06-16',
    employee: { id: 1, role: { id: 1 } },
    details: [
      { id: 1, product: { id: 1, name: 'Zapatillas Nike Air Jordan Azul/Negro', barcode: 'NIKE-AZLNGR-1' }, units: 4 },
      { id: 2, product: { id: 1, name: 'Zapatillas Nike Hi-Top Rojo/Blanco', barcode: 'NIKE-ROJBCO-1' }, units: 1 },
    ]
  },
  {
    id: 2,
    soldOn: '2020-06-18',
    employee: { id: 1, role: { id: 1 } },
    details: [
      { id: 3, product: { id: 1, name: 'Zapatillas Nike Hi-Top Rojo/Negro', barcode: 'NIKE-ROJNGR-1' }, units: 2 },
    ]
  },
  {
    id: 3,
    soldOn: '2020-06-18',
    employee: { id: 1, role: { id: 1 } },
    details: [
      { id: 4, product: { id: 1, name: 'Zapatillas Nike Hi-Top Rojo/Blanco', barcode: 'NIKE-ROJBCO-1' }, units: 1 },
    ]
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
    return this.readById(id).pipe(map(s => s.details));
  }
}

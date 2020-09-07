import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { CompositeEntityDataIService } from '../composite-entity.data.iservice';

@Injectable()
export class SalesHttpDataService
  extends HttpService
  implements CompositeEntityDataIService<Sell, SellDetail> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<Sell> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<Sell[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: Sell, id: string | number): Observable<number> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Sell[]> {
    return this.http.get<Sell[]>(
      this.baseURI + '/sales'
    ).pipe(
      retry(2)
    );
  }

  public readDetailsById(sellId: number): Observable<SellDetail[]> {
    return this.http.get<Sell>(
      this.baseURI + `/sales/${sellId}`
    ).pipe(map(s => s.details));
  }

  public create(sell: Sell): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/sell',
      sell
    );
  }

  public deleteById(sellId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseURI + `/sell/${sellId}`
    );
  }
}

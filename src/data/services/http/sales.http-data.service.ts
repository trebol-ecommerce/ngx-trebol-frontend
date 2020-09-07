import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { CompositeEntityDataIService } from '../composite-entity.data.iservice';

@Injectable()
export class SalesHttpDataService
  extends HttpService
  implements CompositeEntityDataIService<Sell, SellDetail> {

  protected baseURI = this.baseURI + '/gestion/ventas';

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
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public readDetailsById(id: number): Observable<SellDetail[]> {
    return this.http.post<SellDetail[]>(
      this.baseURI + '/detalles',
      id
    );
  }

  public create(vt: Sell): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      vt
    );
  }

  public deleteById(idVenta: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idVenta
    );
  }
}

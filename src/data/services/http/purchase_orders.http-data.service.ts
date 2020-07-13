import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { PurchaseOrderDetail } from 'src/data/models/entities/PurchaseOrderDetail';
import { PurchaseOrder } from 'src/data/models/entities/PurchaseOrder';
import { CompositeEntityDataIService } from '../composite-entity.data.iservice';

@Injectable()
export class PurchaseOrdersHttpDataService
  extends HttpService
  implements CompositeEntityDataIService<PurchaseOrder, PurchaseOrderDetail> {

  protected baseURI = this.baseURI + '/gestion/ordenes_compra';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<PurchaseOrder> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<PurchaseOrder[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: PurchaseOrder, id: string | number): Observable<PurchaseOrder> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public readDetailsById(id: number): Observable<PurchaseOrderDetail[]> {
    return this.http.post<PurchaseOrderDetail[]>(
      this.baseURI + '/detalles',
      id
    );
  }

  public create(oc: PurchaseOrder): Observable<PurchaseOrder> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      oc
    ).pipe(
      map(id => {
        oc.id = id;
        return oc;
      })
    );
  }

  public deleteById(idOrdenCompra: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idOrdenCompra
    );
  }
}

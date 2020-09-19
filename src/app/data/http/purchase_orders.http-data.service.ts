import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseOrder } from 'src/app/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/app/data/models/entities/PurchaseOrderDetail';
import { CompositeEntityCrudIService } from '../composite-entity.crud.iservice';
import { EntityHttpDataService } from './entity.http-data.aservice';

@Injectable()
export class PurchaseOrdersHttpDataService
  extends EntityHttpDataService
  implements CompositeEntityCrudIService<PurchaseOrder, PurchaseOrderDetail> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public create(purchaseOrder: PurchaseOrder): Observable<number> {
    return this.http.post<number>(
      `${this.baseURI}/purchase_order`,
      purchaseOrder
    );
  }

  public readById(id: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(
      `${this.baseURI}/purchase_order/${id}`
    );
  }

  public readDetailsById(id: number): Observable<PurchaseOrderDetail[]> {
    return this.readById(id).pipe(
      map(p => p.details)
    );
  }

  public readAll(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(
      `${this.baseURI}/purchase_orders`
    );
  }

  public readFiltered(filters: any): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(
      `${this.baseURI}/purchase_orders`,
      this.httpParamsOf(filters)
    );
  }

  public update(purchaseOrder: PurchaseOrder, id: number): Observable<number> {
    return this.http.put<number>(
      `${this.baseURI}/purchase_order/${id}`,
      purchaseOrder
    );
  }

  public deleteById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURI}/purchase_order/${id}`
    );
  }
}

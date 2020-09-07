import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseOrder } from 'src/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/data/models/entities/PurchaseOrderDetail';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { CompositeEntityDataIService } from '../composite-entity.data.iservice';

@Injectable()
export class PurchaseOrdersHttpDataService
  extends HttpService
  implements CompositeEntityDataIService<PurchaseOrder, PurchaseOrderDetail> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public create(purchaseOrder: PurchaseOrder): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/purchase_order',
      purchaseOrder
    );
  }

  public readById(purchaseOrderId: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(
      this.baseURI + `/purchase_order/${purchaseOrderId}`
    );
  }

  public readDetailsById(purchaseOrderId: number): Observable<PurchaseOrderDetail[]> {
    return this.readById(purchaseOrderId).pipe(
      map(p => p.details)
    );
  }

  public readAll(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(
      this.baseURI + '/purchase_orders'
    );
  }

  public readFiltered(filters: any): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(
      this.baseURI + '/purchase_orders',
      this.httpParamsOf(filters)
    );
  }

  public update(purchaseOrder: PurchaseOrder, purchaseOrderId: string | number): Observable<number> {
    return this.http.put<number>(
      this.baseURI + `/purchase_order/${purchaseOrderId}`,
      purchaseOrder
    );
  }

  public deleteById(purchaseOrderId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseURI + `/purchase_order/${purchaseOrderId}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseOrder } from 'src/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/data/models/entities/PurchaseOrderDetail';
import { HttpService } from 'src/app/shared/http.abstract-service';
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

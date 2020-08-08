import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataManagerFormService } from 'src/app/management/data-manager-form.aservice';
import { Employee } from 'src/data/models/entities/Employee';
import { Product } from 'src/data/models/entities/Product';
import { Provider } from 'src/data/models/entities/Provider';
import { PurchaseOrder } from 'src/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/data/models/entities/PurchaseOrderDetail';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

@Injectable()
export class PurchaseOrderManagerFormService
  extends DataManagerFormService<PurchaseOrder> {

  protected purchaseOrderDetails: PurchaseOrderDetail[] = [];

  protected purchaseOrderDetailsSource: Subject<PurchaseOrderDetail[]> = new BehaviorSubject([]);

  public purchaseOrderDetails$: Observable<PurchaseOrderDetail[]> = this.purchaseOrderDetailsSource.asObservable();
  public purchaseOrderSubtotalValue$: Observable<number>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.purchaseOrders) protected dataService: CompositeEntityDataIService<PurchaseOrder, PurchaseOrderDetail>,
    @Inject(DATA_INJECTION_TOKENS.employees) protected employeeDataService: EntityDataIService<Employee>,
    @Inject(DATA_INJECTION_TOKENS.providers) protected providerDataService: EntityDataIService<Provider>
  ) {
    super();
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.employeeDataService.readAll();
  }

  public getAllProviders(): Observable<Provider[]> {
    return this.providerDataService.readAll();
  }

  public refreshPurchaseOrderDetailsFromId(id: number): void {
    this.dataService.readDetailsById(id).subscribe(
      (details: PurchaseOrderDetail[]) => {
        this.purchaseOrderDetails = details;
        this.purchaseOrderDetailsSource.next(details);
      }
    );
  }

  public addProducts(newProducts: Product[]): void {
    const newDetails = newProducts.map(
      product => Object.assign<PurchaseOrderDetail, Partial<PurchaseOrderDetail>>(
        new PurchaseOrderDetail(),
        {
          product,
          units: 1
        }
      )
    );
    this.purchaseOrderDetails.push(...newDetails);
    this.purchaseOrderDetailsSource.next(this.purchaseOrderDetails);
  }

  public increaseDetailProductQuantityAtIndex(i: number): void {
    const detail: PurchaseOrderDetail = this.purchaseOrderDetails[i];
    if (detail) {
      detail.units++;
      this.purchaseOrderDetailsSource.next(this.purchaseOrderDetails);
    }
  }

  public decreaseDetailProductQuantityAtIndex(i: number): void {
    const detail: PurchaseOrderDetail = this.purchaseOrderDetails[i];
    if (detail) {
      detail.units--;
      this.purchaseOrderDetailsSource.next(this.purchaseOrderDetails);
    }
  }

  public removeDetailAtIndex(i: number): void {
    this.purchaseOrderDetails.splice(i, 1);
    this.purchaseOrderDetailsSource.next(this.purchaseOrderDetails);
  }

}

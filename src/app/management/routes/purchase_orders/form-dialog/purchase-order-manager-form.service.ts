import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Employee } from 'src/app/data/models/entities/Employee';
import { Product } from 'src/app/data/models/entities/Product';
import { Provider } from 'src/app/data/models/entities/Provider';
import { PurchaseOrder } from 'src/app/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/app/data/models/entities/PurchaseOrderDetail';
import { CompositeEntityDataIService } from 'src/app/data/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityDataIService } from 'src/app/data/entity.data.iservice';
import { switchMap, concatMap, map, toArray } from 'rxjs/operators';

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
    @Inject(DATA_INJECTION_TOKENS.providers) protected providerDataService: EntityDataIService<Provider>,
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>
  ) {
    super();

    this.purchaseOrderSubtotalValue$ = this.purchaseOrderDetails$.pipe(
      map(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(detail => detail.product.price * detail.units).reduce((a, b) => a + b);
        }
      )
    );
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.employeeDataService.readAll();
  }

  public getAllProviders(): Observable<Provider[]> {
    return this.providerDataService.readAll();
  }

  public refreshPurchaseOrderDetailsFromId(id: number): void {
    this.dataService.readDetailsById(id).pipe(
      switchMap(orderDetails => from(orderDetails)),
      concatMap(
        detail => this.productDataService.readById(detail.product.id).pipe(
          map((product) => {
            detail.product = product;
            return detail;
          })
        )
      ),
      toArray()
    ).subscribe(
      (orderDetails: PurchaseOrderDetail[]) => {
        this.purchaseOrderDetails = orderDetails;
        this.purchaseOrderDetailsSource.next(orderDetails);
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

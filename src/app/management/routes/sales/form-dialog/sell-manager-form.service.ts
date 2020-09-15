import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { concatMap, map, switchMap, toArray } from 'rxjs/operators';
import { DataManagerFormService } from 'src/app/management/data-manager-form.aservice';
import { Client } from 'src/data/models/entities/Client';
import { Employee } from 'src/data/models/entities/Employee';
import { Product } from 'src/data/models/entities/Product';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { SellType } from 'src/data/models/entities/SellType';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';

@Injectable()
export class SellManagerFormService
  extends DataManagerFormService<Sell>
  implements OnDestroy {

  protected sellDetails: SellDetail[] = [];
  protected sellDetailsSource: Subject<SellDetail[]> = new BehaviorSubject([]);

  public sellDetails$: Observable<SellDetail[]> = this.sellDetailsSource.asObservable();
  public sellSubtotalValue$: Observable<number>;
  public sellTotalValue$: Observable<number>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sales) protected dataService: CompositeEntityDataIService<Sell, SellDetail>,
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>,
    @Inject(DATA_INJECTION_TOKENS.clients) protected clientDataService: EntityDataIService<Client>,
    @Inject(DATA_INJECTION_TOKENS.employees) protected employeeDataService: EntityDataIService<Employee>,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
  ) {
    super();

    this.sellSubtotalValue$ = this.sellDetails$.pipe(
      map(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(detail => detail.product.price * detail.units).reduce((a, b) => a + b);
        }
      )
    );
    this.sellTotalValue$ = this.sellSubtotalValue$.pipe(map(subtotal => Math.ceil(subtotal * 1.19)));
  }

  ngOnDestroy(): void {
    this.sellDetailsSource.complete();
  }

  public getAllSellTypes(): Observable<SellType[]> {
    return this.sharedDataService.readAllSellTypes();
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.employeeDataService.readAll();
  }

  public getAllClients(): Observable<Client[]> {
    return this.clientDataService.readAll();
  }

  public refreshSellDetailsFromId(id: number): void {
    this.dataService.readDetailsById(id).pipe(
      switchMap(sellDetails => from(sellDetails)),
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
      sellDetails => {
        this.sellDetails = sellDetails;
        this.sellDetailsSource.next(sellDetails);
      }
    );
  }

  public addProducts(newProducts: Product[]): void {
    const newSellDetails: SellDetail[] = newProducts.map(
      product => Object.assign<SellDetail, Partial<SellDetail>>(
        new SellDetail(),
        {
          product,
          units: 1
        }
      )
    );
    this.sellDetails.push(...newSellDetails);
    this.sellDetailsSource.next(this.sellDetails);
  }

  public increaseDetailProductQuantityAtIndex(i: number): void {
    const detail: SellDetail = this.sellDetails[i];
    if (detail) {
      detail.units++;
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public decreaseDetailProductQuantityAtIndex(i: number): void {
    const detail: SellDetail = this.sellDetails[i];
    if (detail) {
      detail.units--;
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public removeDetailAtIndex(i: number) {
    this.sellDetails.splice(i, 1);
    this.sellDetailsSource.next(this.sellDetails);
  }

}

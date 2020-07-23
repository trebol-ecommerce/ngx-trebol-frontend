import { Component, Inject, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, iif, of } from 'rxjs';
import { Product } from 'src/data/models/entities/Product';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { StoreService } from '../store.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

export interface StoreProductDetailsDialogData {
  id: number;
}

@Component({
  selector: 'app-store-product-details-dialog',
  templateUrl: './store-product-details-dialog.component.html',
  styleUrls: ['./store-product-details-dialog.component.css']
})
export class StoreProductDetailsDialogComponent
  implements OnInit {

  protected productSource: Subject<Product> = new Subject();

  public product$: Observable<Product> = this.productSource.asObservable();
  public loading$: Observable<boolean>;
  public productImageURL$: Observable<string>;
  public productName$: Observable<string>;
  public productBarcode$: Observable<string>;
  public productDescription$: Observable<string>;
  public productPrice$: Observable<number>;

  public matchingCartIndex$: Observable<number>;
  public productUnitsInCart$: Observable<number>;
  public productNotInCart$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: StoreProductDetailsDialogData,
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>,
    public service: StoreService,
  ) {
    this.loading$ = this.product$.pipe(map(p => !p));
    this.productImageURL$ = this.product$.pipe(map(p => p.imagesURL[0]));
    this.productName$ = this.product$.pipe(map(p => p.name));
    this.productBarcode$ = this.product$.pipe(map(p => p.barcode));
    this.productDescription$ = this.product$.pipe(map(p => p.description));
    this.productPrice$ = this.product$.pipe(map(p => p.price));
  }

  ngOnInit(): void {
    // do rxjs magic here
    // this.matchingCartIndex$ = this.service.sellDetails$.pipe();
    // this.productNotInCart$ = this.matchingCartIndex$.pipe(map(i => i !== -1));
    // this.productUnitsInCart$ = this.matchingCartIndex$.pipe();
  }

  public onClickIncreaseProductQuantity(): void {
    throw new Error('Not implemented');
  }
  public onClickDecreaseProductQuantity(): void {
    throw new Error('Not implemented');
  }

}

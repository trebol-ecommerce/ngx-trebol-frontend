import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/data/models/entities/Product';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { StoreService } from '../../store.service';

export interface StoreProductDetailsDialogData {
  product: Product;
}

@Component({
  selector: 'app-store-product-details-dialog',
  templateUrl: './store-product-details-dialog.component.html',
  styleUrls: ['./store-product-details-dialog.component.css']
})
export class StoreProductDetailsDialogComponent
  implements OnInit, OnDestroy {

  protected matchingCartSellDetailSource: Subject<SellDetail> = new BehaviorSubject(null);

  protected matchingCartIndex: number;
  public product: Product;

  public matchingCartSellDetail$: Observable<SellDetail> = this.matchingCartSellDetailSource.asObservable();
  public productNotInCart$: Observable<boolean>;
  public productUnitsInCart$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: StoreProductDetailsDialogData,
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>,
    public service: StoreService,
  ) {
    this.product = data.product;
  }

  ngOnInit(): void {
    this.productNotInCart$ = this.matchingCartSellDetail$.pipe(map(d => d === null));
    this.productUnitsInCart$ = this.matchingCartSellDetail$.pipe(
      map(d => d !== null ? d.units : 0)
    );

    this.service.sellDetails$.subscribe(
      details => {
        const index = details.findIndex(d => d.product?.id === this.product.id);
        if (index !== -1) {

          this.matchingCartSellDetailSource.next(details[index]);
        } else {
          this.matchingCartSellDetailSource.next(null);
        }
        this.matchingCartIndex = index;
      }
    );
  }

  ngOnDestroy(): void {
    this.matchingCartSellDetailSource.complete();
  }

  public onClickIncreaseProductQuantity(): void {
    if (this.matchingCartIndex !== -1) {
      this.service.increaseProductUnits(this.matchingCartIndex);
    } else {
      this.service.addProduct(this.product);
    }
  }
  public onClickDecreaseProductQuantity(): void {
    this.service.decreaseProductUnits(this.matchingCartIndex);
  }

}

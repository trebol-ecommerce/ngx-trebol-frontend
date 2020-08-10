import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/data/models/entities/Product';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { StoreCartService } from '../../store-cart.service';

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
    public cartService: StoreCartService,
  ) {
    this.product = data?.product ? data.product : null;
  }

  ngOnInit(): void {
    this.productNotInCart$ = this.matchingCartSellDetail$.pipe(map(d => d === null));
    this.productUnitsInCart$ = this.matchingCartSellDetail$.pipe(
      map(d => d !== null ? d.units : 0)
    );

    this.cartService.sellDetails$.subscribe(
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
      this.cartService.increaseProductUnits(this.matchingCartIndex);
    } else {
      this.cartService.addProductToCart(this.product);
    }
  }
  public onClickDecreaseProductQuantity(): void {
    this.cartService.decreaseProductUnits(this.matchingCartIndex);
  }

}

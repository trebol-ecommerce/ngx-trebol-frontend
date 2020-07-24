import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from 'src/data/models/entities/Product';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { StoreService } from '../store.service';

export interface StoreProductDetailsDialogData {
  product: Product;
}

@Component({
  selector: 'app-store-product-details-dialog',
  templateUrl: './store-product-details-dialog.component.html',
  styleUrls: ['./store-product-details-dialog.component.css']
})
export class StoreProductDetailsDialogComponent
  implements OnInit {

  public product: Product;

  public matchingCartIndex$: Observable<number>;
  public productUnitsInCart$: Observable<number>;
  public productNotInCart$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: StoreProductDetailsDialogData,
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>,
    public service: StoreService,
  ) {
    this.product = data.product;
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

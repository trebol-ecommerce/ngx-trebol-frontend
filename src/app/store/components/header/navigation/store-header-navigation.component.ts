import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/store/store.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-store-header-navigation',
  templateUrl: './store-header-navigation.component.html',
  styleUrls: ['./store-header-navigation.component.css']
})
export class StoreHeaderNavigationComponent
  implements OnInit {

  public cartHasItems$: Observable<boolean>;
  public cartItemCountLabel$: Observable<string>;
  public cartSubtotalValue$: Observable<number>;

  constructor(
    protected storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.cartHasItems$ = this.storeService.cartDetails$.pipe(
      map(array => array.length > 0)
    );
    this.cartItemCountLabel$ = this.storeService.cartItemCount$.pipe(
      map(total => total + ' item' + (total > 1 ? 's' : ''))
    );
    this.cartSubtotalValue$ = this.storeService.cartSubtotalValue$.pipe();
  }

}

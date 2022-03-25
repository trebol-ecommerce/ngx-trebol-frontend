/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, ReplaySubject, BehaviorSubject, from } from 'rxjs';
import { take, switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { Receipt } from 'src/models/Receipt';
import { StoreReceiptService } from './store-receipt.service';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent
  implements OnInit, OnDestroy {

  private loadSubscription: Subscription;
  private receiptSource = new ReplaySubject<Receipt>(1);
  private loadingSource = new BehaviorSubject(true);
  loading$ = this.loadingSource.asObservable();
  receipt$ = this.receiptSource.asObservable();

  constructor(
    private service: StoreReceiptService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadReceipt();
  }

  ngOnDestroy(): void {
    this.loadSubscription?.unsubscribe();
    this.receiptSource.complete();
    this.loadingSource.complete();
  }

  private loadReceipt() {
    this.loadSubscription = this.route.queryParamMap.pipe(
      take(1),
      switchMap(queryParams => {
        const token = queryParams.get('token');
        if (!token) {
          return from(this.router.navigateByUrl('/'));
        } else {
          return this.service.fetchReceipt(token).pipe(
            tap(receipt => this.receiptSource.next(receipt)),
            finalize(() => this.loadingSource.next(false))
          );
        }
      }),
      catchError(() => from(this.router.navigateByUrl('/')))
    ).subscribe();
  }


}

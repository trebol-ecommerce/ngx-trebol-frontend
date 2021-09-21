/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, mapTo, startWith } from 'rxjs/operators';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-store-payment-redirect-prompt-dialog',
  templateUrl: './store-payment-redirect-prompt-dialog.component.html',
  styleUrls: ['./store-payment-redirect-prompt-dialog.component.css']
})
export class StorePaymentRedirectPromptDialogComponent
  implements OnInit, OnDestroy {

  private externalDataSource: Subject<ExternalPaymentRedirectionData | null> = new ReplaySubject(1);

  loading$: Observable<boolean>;
  webpayURL$: Observable<string>;
  webpayToken$: Observable<string>;
  error$: Observable<string | null>;

  constructor(
    private storeService: StoreService
  ) {
    this.loading$ = this.externalDataSource.asObservable().pipe(startWith(true), mapTo(false));
    this.webpayURL$ = this.externalDataSource.asObservable().pipe(map(data => data.url));
    this.webpayToken$ = this.externalDataSource.asObservable().pipe(map(data => data.token));
    this.error$ = this.externalDataSource.asObservable().pipe(map(data => (!!data ? null : 'El servidor no pudo ser alcanzado')));
  }

  ngOnInit(): void {
    this.storeService.submitCart().subscribe(
      data => {
        this.externalDataSource.next(data);
      },
      error => {
        this.externalDataSource.next(null);
      }
    );
  }

  ngOnDestroy(): void {
    this.externalDataSource.complete();
  }
}

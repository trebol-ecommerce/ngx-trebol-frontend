// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, ReplaySubject, concat, of } from 'rxjs';
import { concatMap, map, mapTo, startWith, switchMap } from 'rxjs/operators';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-store-payment-redirect-prompt-dialog',
  templateUrl: './store-payment-redirect-prompt-dialog.component.html',
  styleUrls: ['./store-payment-redirect-prompt-dialog.component.css']
})
export class StorePaymentRedirectPromptDialogComponent
  implements OnInit, OnDestroy {

  protected externalDataSource: Subject<ExternalPaymentRedirectionData> = new ReplaySubject(1);

  public loading$: Observable<boolean>;
  public webpayURL$: Observable<string>;
  public webpayToken$: Observable<string>;

  constructor(
    protected storeService: StoreService
  ) {
    this.loading$ = this.externalDataSource.asObservable().pipe(startWith(true), mapTo(false));
    this.webpayURL$ = this.externalDataSource.asObservable().pipe(map(data => data.url));
    this.webpayToken$ = this.externalDataSource.asObservable().pipe(map(data => data.token));
  }

  ngOnInit(): void {
    this.storeService.submitCart().subscribe(
      data => {
        this.externalDataSource.next(data);
      }
    );
  }

  ngOnDestroy(): void {
    this.externalDataSource.complete();
  }
}

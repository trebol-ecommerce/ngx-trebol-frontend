import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, mapTo, startWith } from 'rxjs/operators';
import { ExternalPaymentRedirectionData } from '../../../data/models/ExternalPaymentRedirectionData';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-payment-redirect-prompt-dialog',
  templateUrl: './store-payment-redirect-prompt-dialog.component.html',
  styleUrls: ['./store-payment-redirect-prompt-dialog.component.css']
})
export class StorePaymentRedirectPromptDialogComponent
  implements OnInit, OnDestroy {

  protected externalDataSource: Subject<ExternalPaymentRedirectionData> = new Subject();

  public loading$: Observable<boolean>;
  public webpayURL$: Observable<string>;
  public webpayToken$: Observable<string>;

  constructor(
    protected storeService: StoreService
  ) {
    this.loading$ = this.externalDataSource.asObservable().pipe(startWith(true), mapTo(false));
    this.webpayURL$ = this.externalDataSource.asObservable().pipe(map(data => data.url));
    this.webpayToken$ = this.externalDataSource.asObservable().pipe(map(data => data.token_ws));
  }

  protected parseFormData(subtotal: number): FormData {
    const total = String(Math.round(subtotal * 1.19));
    const formData = new FormData();
    formData.append('tr_amount', total);
    formData.append('tr_id', '1');
    return formData;
  }

  protected initiateWebpayTransaction(): void {
    this.storeService.sellSubtotalValue$.pipe(
      map((subtotal) => this.parseFormData(subtotal)),
      concatMap((data) => this.storeService.fetchWebpayRedirectionData(data))
    ).subscribe(
      data => {
        this.externalDataSource.next(data);
        this.externalDataSource.complete();
      }
    );
  }

  ngOnInit(): void {
    this.initiateWebpayTransaction();
  }

  ngOnDestroy(): void {
    this.externalDataSource.complete();
  }
}

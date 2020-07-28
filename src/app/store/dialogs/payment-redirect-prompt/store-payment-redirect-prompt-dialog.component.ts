import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, mapTo, startWith } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { environment } from 'src/environments/environment';
import { StoreService } from '../../store.service';

interface ExternalPaymentRedirectionData {
  url: string,
  token_ws: string
}

@Component({
  selector: 'app-store-payment-redirect-prompt-dialog',
  templateUrl: './store-payment-redirect-prompt-dialog.component.html',
  styleUrls: ['./store-payment-redirect-prompt-dialog.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StorePaymentRedirectPromptDialogComponent
  implements OnInit, OnDestroy {

  protected externalDataSource: Subject<ExternalPaymentRedirectionData> = new Subject();

  public loading$: Observable<boolean>;
  public webpayURL$: Observable<string>;
  public webpayToken$: Observable<string>;

  constructor(
    protected appUserService: AppUserService,
    protected service: StoreService,
    protected httpClient: HttpClient
  ) {
    this.loading$ = this.externalDataSource.asObservable().pipe(startWith(true), mapTo(false));
    this.webpayURL$ = this.externalDataSource.asObservable().pipe(map(data => data.url));
    this.webpayToken$ = this.externalDataSource.asObservable().pipe(map(data => data.token_ws));
  }

  protected parseFormData(subtotal: number): FormData {
    const total = String(Math.round(subtotal * 1.19));
    const sessionId = String(this.appUserService.getCurrentSession().id);
    const formData = new FormData();
    formData.append('tr_amount', total);
    formData.append('tr_session', sessionId);
    formData.append('tr_id', '1');
    return formData;
  }

  protected fetchWebpayRedirectionData(data: FormData): Observable<ExternalPaymentRedirectionData> {
    return this.httpClient.post<ExternalPaymentRedirectionData>(
      environment.checkoutURL,
      data
    );
  }

  protected initiateWebpayTransaction(): void {
    this.service.sellSubtotalValue$.pipe(
      map((subtotal) => this.parseFormData(subtotal)),
      concatMap((data) => this.fetchWebpayRedirectionData(data))
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

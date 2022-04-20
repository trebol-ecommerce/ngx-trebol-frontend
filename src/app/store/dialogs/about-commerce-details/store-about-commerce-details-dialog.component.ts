/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, pluck, startWith, tap } from 'rxjs/operators';
import { IAboutPublicApiService } from 'src/app/api/about-public-api.iservice';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { AboutCommerceDetails } from 'src/models/AboutCommerceDetails';

@Component({
  selector: 'app-store-about-commerce-details-dialog',
  templateUrl: './store-about-commerce-details-dialog.component.html',
  styleUrls: ['./store-about-commerce-details-dialog.component.css']
})
export class StoreCompanyDetailsDialogComponent
  implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;
  private dataSource: Subject<AboutCommerceDetails> = new ReplaySubject();

  // TODO move these observables
  data$ = this.dataSource.asObservable();
  loading$ = this.data$.pipe(map(() => false), startWith(true));
  name$ = this.data$.pipe(pluck('name'));
  description$ = this.data$.pipe(pluck('description'));
  // bannerURL$ = this.data$.pipe(pluck('bannerImageURL'));
  logoURL$ = this.data$.pipe(pluck('logoImageURL'));

  constructor(
    @Inject(API_INJECTION_TOKENS.about) private aboutApiService: IAboutPublicApiService
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.aboutApiService.fetchCompanyDetails().pipe(
      tap(next => this.dataSource.next(next))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }

}

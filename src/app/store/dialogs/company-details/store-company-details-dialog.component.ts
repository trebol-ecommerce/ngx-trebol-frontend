/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { mapTo, pluck, startWith } from 'rxjs/operators';
import { IAboutPublicApiService } from 'src/app/api/about-public-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { CompanyDetails } from 'src/app/models/CompanyDetails';

@Component({
  selector: 'app-store-company-details-dialog',
  templateUrl: './store-company-details-dialog.component.html',
  styleUrls: ['./store-company-details-dialog.component.css']
})
export class StoreCompanyDetailsDialogComponent
  implements OnInit {

  private dataSource: Subject<CompanyDetails> = new ReplaySubject();

  data$: Observable<CompanyDetails> = this.dataSource.asObservable();
  loading$: Observable<boolean> = this.data$.pipe(mapTo(false), startWith(true));
  name$: Observable<string> = this.data$.pipe(pluck('name'));
  description$: Observable<string> = this.data$.pipe(pluck('description'));
  bannerURL$: Observable<string> = this.data$.pipe(pluck('bannerImageURL'));
  logoURL$: Observable<string> = this.data$.pipe(pluck('logoImageURL'));


  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.categories) private sharedDataService: IAboutPublicApiService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.fetchCompanyDetails().subscribe(
      companyDetails => { this.dataSource.next(companyDetails); }
    );
  }

}

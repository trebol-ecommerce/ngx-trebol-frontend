/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { mapTo, pluck, startWith } from 'rxjs/operators';
import { IAboutPublicApiService } from 'src/app/api/about-public-api.iservice';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { CompanyDetails } from 'src/models/CompanyDetails';

@Component({
  selector: 'app-store-company-details-dialog',
  templateUrl: './store-company-details-dialog.component.html',
  styleUrls: ['./store-company-details-dialog.component.css']
})
export class StoreCompanyDetailsDialogComponent
  implements OnInit {

  private dataSource: Subject<CompanyDetails> = new ReplaySubject();

  data$ = this.dataSource.asObservable();
  loading$ = this.data$.pipe(mapTo(false), startWith(true));
  name$ = this.data$.pipe(pluck('name'));
  description$ = this.data$.pipe(pluck('description'));
  // bannerURL$ = this.data$.pipe(pluck('bannerImageURL'));
  logoURL$ = this.data$.pipe(pluck('logoImageURL'));

  constructor(
    @Inject(API_INJECTION_TOKENS.about) private aboutApiService: IAboutPublicApiService
  ) { }

  ngOnInit(): void {
    this.aboutApiService.fetchCompanyDetails().subscribe(
      companyDetails => { this.dataSource.next(companyDetails); }
    );
  }

}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Inject, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { mapTo, pluck, startWith } from 'rxjs/operators';
import { DATA_INJECTION_TOKENS } from 'src/app/api/data-mgt/data-injection-tokens';
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { SharedDataIService } from 'src/app/api/data-mgt/shared.data.iservice';

@Component({
  selector: 'app-store-company-details-dialog',
  templateUrl: './store-company-details-dialog.component.html',
  styleUrls: ['./store-company-details-dialog.component.css']
})
export class StoreCompanyDetailsDialogComponent
  implements OnInit {

  private dataSource: Subject<CompanyDetails> = new ReplaySubject();

  public data$: Observable<CompanyDetails> = this.dataSource.asObservable();
  public loading$: Observable<boolean> = this.data$.pipe(mapTo(false), startWith(true));
  public name$: Observable<string> = this.data$.pipe(pluck('name'));
  public description$: Observable<string> = this.data$.pipe(pluck('description'));
  public bannerURL$: Observable<string> = this.data$.pipe(pluck('bannerImageURL'));
  public logoURL$: Observable<string> = this.data$.pipe(pluck('logoImageURL'));


  constructor(
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.readCompanyDetails().subscribe(
      companyDetails => { this.dataSource.next(companyDetails); }
    );
  }

}

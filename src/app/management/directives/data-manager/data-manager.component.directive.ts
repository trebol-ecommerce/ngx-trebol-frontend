/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { DataManagerServiceDirective } from './data-manager.service.directive';

/**
 * Base  for data manager template components.
 * Implement openFormDialog() to view/edit data
 */
@Directive()
export abstract class DataManagerComponentDirective<T>
  implements OnInit {

  pageSizeOptions = [10, 20, 50, 100];

  loading$: Observable<boolean>;
  busy$: Observable<boolean>;
  items$: Observable<any[]>;
  totalCount$: Observable<number>;
  canEdit$: Observable<boolean>;
  canAdd$: Observable<boolean>;
  canDelete$: Observable<boolean>;

  protected abstract service: DataManagerServiceDirective<T>;
  protected abstract route: ActivatedRoute;

  ngOnInit() {
    this.init(this.service);
  }

  onSortChange(event: Sort): void {
    this.service.sortBy = event.active;
    this.service.order = event.direction;
    this.service.reloadItems();
  }

  onPage(event: PageEvent): void {
    this.service.pageIndex = event.pageIndex;
    this.service.pageSize = event.pageSize;
    this.service.reloadItems();
  }

  protected init(service: DataManagerServiceDirective<T>): void {
    this.loading$ = service.loading$.pipe();
    this.busy$ = service.focusedItems$.pipe(map(items => items?.length > 0));
    this.items$ = service.items$.pipe();
    this.totalCount$ = service.totalCount$.pipe();
    this.canEdit$ = service.canEdit$.pipe();
    this.canAdd$ = service.canAdd$.pipe();
    this.canDelete$ = service.canDelete$.pipe();
    service.pageSize = this.pageSizeOptions[0];
    this.route.data.pipe(
      take(1),
      tap(data => {
        this.service.updateAccess(data.access);
        this.service.reloadItems();
      })
    ).subscribe();
  }
}

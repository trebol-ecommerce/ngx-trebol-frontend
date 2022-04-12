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
import { map, share, take, tap } from 'rxjs/operators';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';
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
  actions$: Observable<string[]>;
  canCreate$: Observable<boolean>;
  canUpdate$: Observable<boolean>;
  canDelete$: Observable<boolean>;

  protected abstract service: DataManagerServiceDirective<T>;
  protected abstract route: ActivatedRoute;

  ngOnInit() {
    this.init();
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

  protected init(): void {
    this.loading$ = this.service.loading$.pipe();
    this.items$ = this.service.items$.pipe();
    this.totalCount$ = this.service.totalCount$.pipe();

    this.busy$ = this.service.focusedItems$.pipe(
      map(items => items?.length > 0)
    );

    this.actions$ = this.route.data.pipe(
      take(1),
      map(data => data.access as AuthorizedAccess),
      map(access => (access?.permissions || [])),
      share()
    );

    this.canCreate$ = this.actions$.pipe(
      map(actions => (actions.length > 0 && actions.includes('create')))
    );
    this.canUpdate$ = this.actions$.pipe(
      map(actions => (actions.length > 0 && actions.includes('update')))
    );
    this.canDelete$ = this.actions$.pipe(
      map(actions => (actions.length > 0 && actions.includes('delete')))
    );

    this.service.pageSize = this.pageSizeOptions[0];
    this.service.reloadItems();
  }
}

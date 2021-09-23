/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataManagerServiceDirective } from './data-manager.service-directive';

/**
 * Base  for data manager template components.
 * Implement openFormDialog() to view/edit data
 */
@Directive()
export abstract class DataManagerComponentDirective<T>
  implements OnInit {

  loading$: Observable<boolean>;
  busy$: Observable<boolean>;
  items$: Observable<T[]>;
  canEdit$: Observable<boolean>;
  canAdd$: Observable<boolean>;
  canDelete$: Observable<boolean>;

  protected abstract service: DataManagerServiceDirective<T>;
  abstract tableColumns: string[];

  ngOnInit() {
    this.init(this.service);
  }

  protected init(service: DataManagerServiceDirective<T>): void {
    this.loading$ = service.loading$.pipe();
    this.busy$ = service.focusedItems$.pipe(map(items => items?.length > 0));
    this.items$ = service.items$.pipe();
    this.canEdit$ = service.canEdit$.pipe();
    this.canAdd$ = service.canAdd$.pipe();
    this.canDelete$ = service.canDelete$.pipe();
  }
}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Directive, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AbstractEntity } from 'src/app/models/AbstractEntity';
import { DataManagerServiceDirective } from './data-manager.service-directive';

/**
 * Base class for data manager template components.
 * A 'Data Manager' is a table-based interface for doing CRUD operations on all persisted instances of classes derived from AbstractEntity.
 * It it expected to provide an openFormDialog() method that interacts with a DataManagerFormComponent,
 * which will be used to view and edit the stored data (or insert new).
 */
@Directive()
export abstract class DataManagerComponentDirective<T> {

  public loading$: Observable<boolean>;
  public busy$: Observable<boolean>;
  public items$: Observable<T[]>;
  public canEdit$: Observable<boolean>;
  public canAdd$: Observable<boolean>;
  public canDelete$: Observable<boolean>;

  protected abstract service: DataManagerServiceDirective<T>;
  public abstract tableColumns: string[];
  public abstract openFormDialog(item: T): Observable<T>;

  init(service: DataManagerServiceDirective<T>): void {
    this.loading$ = service.loading$.pipe();
    this.busy$ = service.focusedItems$.pipe(map(items => items?.length > 0));
    this.items$ = service.items$.pipe();
    this.canEdit$ = service.canEdit$.pipe();
    this.canAdd$ = service.canAdd$.pipe();
    this.canDelete$ = service.canDelete$.pipe();
  }

  protected edit(item: T): Observable<T> {
    this.service.focusedItems = [item];
    return this.openFormDialog(item).pipe(
      tap(
        (result) => {
          this.service.focusedItems = [];
          if (!!result) { // truthy
            this.service.reloadItems();
          }
        }
      )
    );
  }

  public onClickEdit(item: T): void {
    this.edit(item).subscribe();
  }

  public onClickAdd(): void {
    this.edit(undefined).subscribe();
  }

  public onClickDelete(item: T): void {
    throw Error('Operación no soportada.');
  }

}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Directive, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataManagerServiceDirective } from './data-manager.service-directive';
import { MatDialog } from '@angular/material/dialog';
import { DataManagerFormDialogComponent } from '../dialogs/data-manager-form-dialog/data-manager-form-dialog.component';
import { DataManagerFormDialogConfig } from '../dialogs/data-manager-form-dialog/DataManagerFormDialogConfig';
import { DataManagerComponentDirective } from './data-manager.component-directive';

/**
 * Base  for data manager template components.
 * Implement openFormDialog() to view/edit data
 */
@Directive()
export abstract class TransactionalDataManagerComponentDirective<T>
  extends DataManagerComponentDirective<T> {

  onClickEdit(item: T): void {
    this.edit(item).subscribe();
  }

  onClickAdd(): void {
    this.edit(undefined).subscribe();
  }

  protected abstract createDialogProperties(item: T | undefined): DataManagerFormDialogConfig<T>;

  protected edit(item: T | undefined): Observable<T> {
    this.service.focusedItems = [item];
    return this.dialogService.open(
      DataManagerFormDialogComponent,
      this.createDialogProperties(item)
    ).afterClosed().pipe(
      tap(result => {
        this.service.focusedItems = [];
        if (!!result) { // truthy
          this.service.reloadItems();
        }
      })
    );
  }

}

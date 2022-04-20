/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EntityFormDialogComponent } from '../../dialogs/entity-form/entity-form-dialog.component';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { DataManagerComponentDirective } from '../data-manager/data-manager.component.directive';

/**
 * Base for data manager template components.
 * Implement createDialogProperties() to view/edit data
 */
@Directive()
export abstract class TransactionalDataManagerComponentDirective<T>
  extends DataManagerComponentDirective<T> {

  protected abstract dialogService: MatDialog;

  onClickEdit(item: T): void {
    this.edit(item).subscribe();
  }

  onClickCreate(): void {
    this.edit(undefined).subscribe();
  }

  protected abstract createDialogProperties(item: T | undefined): EntityFormDialogConfig<T>;

  protected edit(item: T | undefined): Observable<T> {
    this.service.focusedItems = [item];
    return this.dialogService.open(
      EntityFormDialogComponent,
      this.createDialogProperties(item)
    ).afterClosed().pipe(
      tap(() => { this.service.focusedItems = [] }),
      switchMap(result => (!!result) ? // truthy
        this.service.reloadItems() :
        of(void 0)
      )
    );
  }

}

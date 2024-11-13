/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, finalize, map, switchMap } from 'rxjs/operators';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { DataManagerServiceDirective } from '../data-manager/data-manager.service.directive';

@Directive()
export abstract class TransactionalDataManagerServiceDirective<T>
  extends DataManagerServiceDirective<T> {

  abstract dataService: ITransactionalEntityDataApiService<T>;

  constructor(
    protected sharedDialogService: SharedDialogService
  ) {
    super();
  }

  /** Delete items contained in the array one by one */
  removeItems(items: T[]): Observable<boolean[]> {
    this.focusedItems = items;
    return this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of dialog prompt to confirm deletion:Confirm deletion`,
      message: $localize`:Paragraph asking confirmation to delete a portion of data, reminding that it cannot be undone:Are you sure you want to delete this item?`
    }).pipe(
      filter(didConfirm => !!didConfirm),
      switchMap(() => forkJoin(items.map(item => (
        this.dataService.delete(item).pipe(
          map(() => true),
          catchError(() => of(false))
        )
      )))),
      finalize(() => { this.focusedItems = []; })
    );
  }

}

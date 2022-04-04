/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { filter, switchMapTo } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ISalesDataApiService } from 'src/app/api/sales.data.api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { Sell } from 'src/models/entities/Sell';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager/transactional-data-manager.service.directive';

@Injectable()
export class ManagementSalesService
  extends TransactionalDataManagerServiceDirective<Sell> {

  constructor(
    protected sharedDialogService: SharedDialogService,
    @Inject(API_INJECTION_TOKENS.dataSales) public dataService: ISalesDataApiService
  ) {
    super(sharedDialogService);
  }

  markRejected(sell: Partial<Sell>) {
    return this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of generic confirmation dialog:Confirmation required`,
      message: $localize`:Label to hint user that rejections cannot be undone, and they do not trigger automatic refunds:The sell will remain read-only. Any refunds will have to be issued manually. This operation cannot be undone. Are you sure you want to reject this order?`
    }).pipe(
      filter(didConfirm => !!didConfirm),
      switchMapTo(this.dataService.markAsRejected(sell as Sell))
    );
  }

  markConfirmed(sell: Partial<Sell>) {
    return this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of generic confirmation dialog:Confirmation required`,
      message: $localize`:Label to hint user that confirmations cannot be undone, and they trigger an automatic mail to the customer:The customer will be notified and sent a receipt by e-mail. This operation cannot be undone. Are you sure you want to confirm this order?`
    }).pipe(
      filter(didConfirm => !!didConfirm),
      switchMapTo(this.dataService.markAsConfirmed(sell as Sell))
    );
  }

  markComplete(sell: Partial<Sell>) {
    return this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of generic confirmation dialog:Confirmation required`,
      message: $localize`:Label to hint user that completions cannot be undone:The sell will remain read-only. This operation cannot be undone. Are you sure you want to mark this order as completed?`
    }).pipe(
      filter(didConfirm => !!didConfirm),
      switchMapTo(this.dataService.markAsCompleted(sell as Sell))
    );
  }


  fetch(sell: Partial<Sell>) {
    return this.dataService.fetchExisting(sell);
  }

}

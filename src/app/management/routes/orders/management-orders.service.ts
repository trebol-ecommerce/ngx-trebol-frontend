/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IOrdersDataApiService } from 'src/app/api/orders.data.api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { Order } from 'src/models/entities/Order';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager/transactional-data-manager.service.directive';

@Injectable()
export class ManagementOrdersService
  extends TransactionalDataManagerServiceDirective<Order> {

  constructor(
    protected sharedDialogService: SharedDialogService,
    @Inject(API_INJECTION_TOKENS.dataOrders) public dataService: IOrdersDataApiService
  ) {
    super(sharedDialogService);
  }

  markRejected(order: Partial<Order>) {
    return this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of generic confirmation dialog:Confirmation required`,
      message: $localize`:Label to hint user that rejections cannot be undone, and they do not trigger automatic refunds:The order will remain read-only. Any refunds will have to be issued manually. This operation cannot be undone. Are you sure you want to reject this order?`
    }).pipe(
      filter(didConfirm => !!didConfirm),
      switchMap(() => this.dataService.markAsRejected(order as Order))
    );
  }

  markConfirmed(order: Partial<Order>) {
    return this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of generic confirmation dialog:Confirmation required`,
      message: $localize`:Label to hint user that confirmations cannot be undone, and they trigger an automatic mail to the customer:The customer will be notified and sent a receipt by e-mail. This operation cannot be undone. Are you sure you want to confirm this order?`
    }).pipe(
      filter(didConfirm => !!didConfirm),
      switchMap(() => this.dataService.markAsConfirmed(order as Order))
    );
  }

  markComplete(order: Partial<Order>) {
    return this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of generic confirmation dialog:Confirmation required`,
      message: $localize`:Label to hint user that completions cannot be undone:The order will remain read-only. This operation cannot be undone. Are you sure you want to mark this order as completed?`
    }).pipe(
      filter(didConfirm => !!didConfirm),
      switchMap(() => this.dataService.markAsCompleted(order as Order))
    );
  }


  fetch(order: Partial<Order>) {
    return this.dataService.fetchExisting(order);
  }

}

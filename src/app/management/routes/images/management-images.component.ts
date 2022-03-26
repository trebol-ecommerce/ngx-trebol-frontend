/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Image } from 'src/models/entities/Image';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager/transactional-data-manager.component.directive';
import { ManagementImagesService } from './management-images.service';

@Component({
  selector: 'app-management-images',
  templateUrl: './management-images.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-images.component.css'
  ]
})
export class ManagementImagesComponent
  extends TransactionalDataManagerComponentDirective<Image>
  implements OnInit {

  tableColumns = [ 'thumb', 'filename', 'actions' ];

  constructor(
    protected service: ManagementImagesService,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute,
    private snackBarService: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    super.init(this.service);
  }

  protected createDialogProperties(item: Image): EntityFormDialogConfig<Image> {
    return {
      data: {
        item,
        entityType: 'image',
        apiService: this.service.dataService
      },
      width: '40rem'
    };
  }

  onClickDelete(img: Image) {
    this.service.removeItems([img]).pipe(
      catchError(error => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        return of(error);
      }),
      tap(() => {
        const deletionSucess = $localize`:Message of success after deleting an image with filename {{ fileName }}:Image '${img.filename}:fileName:' deleted`;
        this.snackBarService.open(deletionSucess, COMMON_DISMISS_BUTTON_LABEL);
        this.service.reloadItems();
      })
    ).subscribe();
  }

}

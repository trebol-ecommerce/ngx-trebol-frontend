/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Image } from 'src/app/models/entities/Image';
import { ImageFormComponent } from 'src/app/shared/components/image-form/image-form.component';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE, COMMON_WARNING_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../../shared/dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';
import { ImageManagerService } from './image-manager.service';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './image-manager.component.css'
  ]
})
export class ImageManagerComponent
  extends TransactionalDataManagerComponentDirective<Image>
  implements OnInit {

  tableColumns: string[] = [ 'thumb', 'filename', 'actions' ];

  constructor(
    protected service: ImageManagerService,
    private route: ActivatedRoute,
    private snackBarService: MatSnackBar,
    protected dialogService: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    super.init(this.service);
    this.route.data.subscribe(
      d => {
        this.service.updateAccess(d.access);
        this.service.reloadItems();
      }
    );
  }

  protected createDialogProperties(item: Image): EntityFormDialogConfig<Image> {
    return {
      data: {
        item,
        formComponent: ImageFormComponent,
        service: this.service.dataService
      },
      width: '40rem'
    };
  }

  onClickDelete(img: Image) {
    this.service.removeItems([img]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          const deletionSucess = $localize`:Message of success after deleting an image with filename {{ fileName }}:Image '${img.filename}':fileName: deleted`;
          this.snackBarService.open(deletionSucess, COMMON_DISMISS_BUTTON_LABEL);
          this.service.reloadItems();
        } else {
          this.snackBarService.open(COMMON_WARNING_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        }
      },
      error => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
      }
    );
  }

}

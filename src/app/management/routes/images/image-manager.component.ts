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
import { ImageUploadFormComponent } from 'src/app/shared/components/image-upload-form/image-upload-form.component';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormDialogConfig } from '../../dialogs/data-manager-form-dialog/DataManagerFormDialogConfig';
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

  protected createDialogProperties(item: Image): DataManagerFormDialogConfig<Image> {
    return {
      data: {
        item,
        formComponent: ImageUploadFormComponent,
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
          this.snackBarService.open(`Imagen '${img.filename}' eliminada`, 'OK');
          this.service.reloadItems();
        } else {
          this.snackBarService.open(COMMON_WARNING_MESSAGE, 'OK');
        }
      },
      error => {
        this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
      }
    );
  }

}

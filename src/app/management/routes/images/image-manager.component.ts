// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { DataManagerComponentDirective } from '../data-manager.component-directive';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ImageManagerService } from './image-manager.service';
import { Image } from 'src/app/models/entities/Image';
import { MatDialog } from '@angular/material/dialog';
import { ImageManagerUploadDialogComponent } from './upload-dialog/image-manager-upload-dialog.component';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './image-manager.component.css'
  ]
})
export class ImageManagerComponent
  extends DataManagerComponentDirective<Image>
  implements OnInit {

  public tableColumns: string[] = [ 'thumb', 'filename', 'actions' ];

  constructor(
    protected service: ImageManagerService,
    protected route: ActivatedRoute,
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

  public openFormDialog(item: Image): Observable<Image> {
    return this.dialogService.open(
      ImageManagerUploadDialogComponent,
      {
        width: '40rem'
      }
    ).afterClosed();
  }

}

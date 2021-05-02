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

  public tableColumns: string[] = [  ];

  constructor(
    protected service: ImageManagerService,
    protected route: ActivatedRoute
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
    throw new Error("Method not implemented.");
  }

}

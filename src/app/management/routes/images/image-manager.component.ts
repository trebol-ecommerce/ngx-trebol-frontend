// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { DataManagerComponentDirective } from '../data-manager.component-directive';
import { Product } from 'src/app/models/entities/Product';
import { DataManagerServiceDirective } from '../data-manager.service-directive';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './image-manager.component.css'
  ]
})
export class ImageManagementComponent
  extends DataManagerComponentDirective<Product>
  implements OnInit {

  public tableColumns: string[] = [  ];

  constructor(
    protected service: DataManagerServiceDirective<Product>,
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

  public openFormDialog(item: Product): Observable<Product> {
    throw new Error("Method not implemented.");
  }

}

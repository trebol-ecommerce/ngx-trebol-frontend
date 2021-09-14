// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/entities/Customer';
import { DataManagerComponentDirective } from '../../directives/data-manager.component-directive';
import { CustomerManagerService } from './customer-manager.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './customer-manager.component.css'
  ]
})
export class CustomerManagerComponent
  extends DataManagerComponentDirective<Customer>
  implements OnInit {

  public tableColumns: string[] = [ 'name', 'idNumber' ];

  constructor(
    protected service: CustomerManagerService,
    protected route: ActivatedRoute,
    protected dialogService: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.data.subscribe(
      d => {
        this.service.updateAccess(d.access);
        this.service.reloadItems();
      }
    );
  }

}

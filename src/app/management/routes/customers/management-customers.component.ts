/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/models/entities/Customer';
import { DataManagerComponentDirective } from '../../directives/data-manager/data-manager.component.directive';
import { ManagementCustomersService } from './management-customers.service';

@Component({
  selector: 'app-management-customers',
  templateUrl: './management-customers.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-customers.component.css'
  ]
})
export class ManagementCustomersComponent
  extends DataManagerComponentDirective<Customer>
  implements OnInit {

  tableColumns = ['name', 'idNumber'];

  constructor(
    protected service: ManagementCustomersService,
    private route: ActivatedRoute
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

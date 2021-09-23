/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/entities/Customer';
import { DataManagerComponentDirective } from '../../directives/data-manager.component-directive';
import { CustomerManagerService } from './customer-manager.service';

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

  tableColumns: string[] = [ 'name', 'idNumber' ];

  constructor(
    protected service: CustomerManagerService,
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

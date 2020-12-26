// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/entities/Customer';
import { DataManagerComponentDirective } from '../data-manager.component-directive';
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

  public tableColumns: string[] = [ 'name', 'idCard' ];

  constructor(
    protected service: CustomerManagerService,
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

  public openFormDialog(item: Customer): Observable<Customer> {
    throw new Error('Method not implemented.');
  }

}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/entities/Client';
import { DataManagerComponentDirective } from '../data-manager.component-directive';
import { ClientManagerService } from './client-manager.service';

@Component({
  selector: 'app-client-manager',
  templateUrl: './client-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './client-manager.component.css'
  ]
})
export class ClientManagerComponent
  extends DataManagerComponentDirective<Client>
  implements OnInit {

  public tableColumns: string[] = [ 'name', 'idCard' ];

  constructor(
    protected service: ClientManagerService,
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

  public openFormDialog(item: Client): Observable<Client> {
    throw new Error('Method not implemented.');
  }

}

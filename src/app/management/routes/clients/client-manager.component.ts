import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable, of } from 'rxjs';
import { concatMap, pluck, tap } from 'rxjs/operators';
import { Client } from 'src/app/data/models/entities/Client';
import { DataManagerComponent } from '../data-manager.acomponent';
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
  extends DataManagerComponent<Client>
  implements OnInit {

  public tableColumns: string[] = [ 'name', 'idCard' ];

  constructor(
    protected service: ClientManagerService,
    protected route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
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

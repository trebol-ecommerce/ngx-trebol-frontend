import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/data/models/entities/Client';
import { DataManagerComponent } from '../../data-manager.acomponent';
import { ClientManagerService } from './client-manager.service';

@Component({
  selector: 'app-client-manager',
  templateUrl: './client-manager.component.html',
  styleUrls: [ '../../data-manager.styles.css' ]
})
export class ClientManagerComponent
  extends DataManagerComponent<Client> {

  public tableColumns: string[] = [ 'name', 'idCard' ];

  constructor(
    protected service: ClientManagerService
  ) {
    super();
  }

  public openFormDialog(item: Client): Observable<Client> {
    throw new Error('Method not implemented.');
  }

}

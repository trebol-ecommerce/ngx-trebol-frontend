import { Component } from '@angular/core';
import { DataItemFormAbstractComponent } from 'src/app/management/data-item-form.abstract-component';
import { Client } from 'src/data/models/entities/Client';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-manager-form-dialog',
  templateUrl: './client-manager-form-dialog.component.html',
  styleUrls: [ './client-manager-form-dialog.component.css' ]
})
export class ClientManagerFormDialogComponent
  extends DataItemFormAbstractComponent<Client> {

  protected itemId: number;
  protected dataService: EntityDataIService<Client>;
  public saving$: Observable<boolean>;
  public formGroup: FormGroup;
  public dialogTitle: string;

  constructor() {
    super();
  }

  protected load(item: Client): void {
    throw new Error("Method not implemented.");
  }

  public asItem(): Client {
    throw new Error('Method not implemented.');
  }
  public onSubmit(): void {
    throw new Error('Method not implemented.');
  }
  public onCancel(): void {
    throw new Error('Method not implemented.');
  }

}

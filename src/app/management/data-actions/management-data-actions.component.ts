import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Barra de acciones genérica. Se sitúa debajo o encima de un listado de mantenedor.
 */
@Component({
  selector: 'app-management-data-actions',
  templateUrl: './management-data-actions.component.html',
  styleUrls: ['./management-data-actions.component.css']
})
export class ManagementDataActionsComponent {

  @Output() public add: EventEmitter<void>;

  constructor() {
    this.add = new EventEmitter();
  }

  public onClickAdd(): void {
    this.add.emit();
  }

}

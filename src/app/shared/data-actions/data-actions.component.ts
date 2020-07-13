import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Barra de acciones genérica. Se sitúa debajo o encima de un listado de mantenedor.
 */
@Component({
  selector: 'app-data-actions',
  templateUrl: './data-actions.component.html',
  styleUrls: ['./data-actions.component.css']
})
export class DataActionsComponent {

  @Output() public add: EventEmitter<void>;

  constructor() {
    this.add = new EventEmitter();
  }

  public onClickAgregar(): void {
    this.add.emit();
  }

}

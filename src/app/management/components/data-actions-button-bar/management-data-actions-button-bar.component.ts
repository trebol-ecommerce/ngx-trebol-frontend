/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

type DataActions = 'add' | 'delete';

/**
 * Generic action buttons bar. Should be placed below data listing components.
 */
@Component({
  selector: 'app-management-data-actions-button-bar-button-bar',
  templateUrl: './management-data-actions-button-bar.component.html',
  styleUrls: ['./management-data-actions-button-bar.component.css']
})
export class ManagementDataActionsButtonBarComponent {

  @Input() actions: DataActions[] = [];

  @Output() add = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  get showAdd() { return this.actions.includes('add'); }
  get showDelete() { return this.actions.includes('delete'); }

  constructor() { }

  onClickAdd(): void {
    this.add.emit();
  }

  onClickDelete(): void {
    this.delete.emit();
  }
}

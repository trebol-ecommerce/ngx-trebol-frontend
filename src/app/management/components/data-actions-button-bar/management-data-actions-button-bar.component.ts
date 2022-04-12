/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

type DataActions = 'add';

/**
 * Generic action buttons bar. Should be placed below data listing components.
 */
@Component({
  selector: 'app-management-data-actions-button-bar',
  templateUrl: './management-data-actions-button-bar.component.html',
  styleUrls: ['./management-data-actions-button-bar.component.css']
})
export class ManagementDataActionsButtonBarComponent {

  @Input() actions: (DataActions | string)[] = [];

  @Output() create = new EventEmitter<void>();

  get showCreate() { return this.actions.includes('create'); }

  constructor() { }

  onClickCreate(): void {
    this.create.emit();
  }
}

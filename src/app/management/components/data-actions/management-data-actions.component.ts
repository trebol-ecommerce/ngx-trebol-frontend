/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Generic action buttons bar. Should be placed below data listing components.
 */
@Component({
  selector: 'app-management-data-actions',
  templateUrl: './management-data-actions.component.html',
  styleUrls: ['./management-data-actions.component.css']
})
export class ManagementDataActionsComponent {

  @Output() add: EventEmitter<void>;

  constructor() {
    this.add = new EventEmitter();
  }

  onClickAdd(): void {
    this.add.emit();
  }

}

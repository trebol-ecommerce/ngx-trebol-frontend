/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ManagementService } from 'src/app/management/management.service';

@Component({
  selector: 'app-management-header-sidenav-button',
  templateUrl: './management-header-sidenav-button.component.html',
  styleUrls: ['./management-header-sidenav-button.component.css']
})
export class ManagementHeaderSidenavButtonComponent {

  constructor(
    protected service: ManagementService
  ) { }

  toggle(): void {
    this.service.toggleSidenav();
  }

}

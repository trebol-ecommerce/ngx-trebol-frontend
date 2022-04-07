/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ManagementSidenavService } from 'src/app/management/components/sidenav/management-sidenav.service';

@Component({
  selector: 'app-management-header-sidenav-button',
  templateUrl: './management-header-sidenav-button.component.html',
  styleUrls: ['./management-header-sidenav-button.component.css']
})
export class ManagementHeaderSidenavButtonComponent {

  constructor(
    private service: ManagementSidenavService
  ) { }

  toggle(): void {
    this.service.toggleSidenav();
  }

}

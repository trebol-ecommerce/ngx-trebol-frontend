/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ManagementSidenavService } from './components/sidenav/management-sidenav.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent
  implements OnInit {

  isSidenavOpen$: Observable<boolean>;

  constructor(
    private sidenavService: ManagementSidenavService
  ) { }

  ngOnInit(): void {
    this.isSidenavOpen$ = this.sidenavService.isSidenavOpen$.pipe();
  }
}

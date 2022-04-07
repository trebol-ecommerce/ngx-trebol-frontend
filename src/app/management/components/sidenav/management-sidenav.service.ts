/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Keeps track of the sidenav open state
 */
@Injectable()
export class ManagementSidenavService
  implements OnDestroy {

  private isSidenavOpenSource = new BehaviorSubject(true);

  isSidenavOpen$ = this.isSidenavOpenSource.asObservable();

  constructor() { }

  ngOnDestroy(): void {
    this.isSidenavOpenSource.complete();
  }

  toggleSidenav(): void {
    this.isSidenavOpenSource.next(!this.isSidenavOpenSource.value);
  }
}

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Keeps track of the sidenav open state
 */
@Injectable()
export class ManagementSidenavService {

  private isSidenavOpenSource = new BehaviorSubject(true);

  isSidenavOpen$ = this.isSidenavOpenSource.asObservable();

  constructor() { }

  toggleSidenav(): void {
    this.isSidenavOpenSource.next(!this.isSidenavOpenSource.value);
  }
}

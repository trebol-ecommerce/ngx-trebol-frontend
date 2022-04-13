/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { SessionService } from '../session.service';
import { ManagementSidenavService } from './components/sidenav/management-sidenav.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent
  implements OnInit {

  private sessionCheckSub: Subscription;

  isSidenavOpen$: Observable<boolean>;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private sidenavService: ManagementSidenavService
  ) { }

  ngOnInit(): void {
    this.isSidenavOpen$ = this.sidenavService.isSidenavOpen$.pipe();
    this.sessionCheckSub = this.sessionService.userHasActiveSession$.pipe(
      filter(hasActiveSession => !hasActiveSession),
      take(1),
      tap(() => this.whenSessionBecomesInactive())
    ).subscribe();
  }

  private whenSessionBecomesInactive() {
    this.router.navigateByUrl('/');
  }
}

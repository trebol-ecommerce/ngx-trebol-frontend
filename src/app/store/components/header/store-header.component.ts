/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.css']
})
export class StoreHeaderComponent
  implements OnInit {

  readonly middleLabel = $localize`:Title of application:Online store`;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.sessionService.userHasActiveSession$.pipe();
  }

}

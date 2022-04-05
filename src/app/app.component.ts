/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { delay, filter, mapTo, startWith, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading$ = merge(
      of(true),
      this.router.events.pipe(
        filter(ev => ev instanceof ActivationEnd),
        take(1),
        delay(50),
        mapTo(false)
      )
    );
  }

}

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ManagementService } from './management.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent
  implements OnInit {

  public isSidenavOpen$: Observable<boolean>;

  constructor(
    protected service: ManagementService
  ) {
  }

  ngOnInit(): void {
    this.isSidenavOpen$ = this.service.isSidenavOpen$.pipe();
  }
}

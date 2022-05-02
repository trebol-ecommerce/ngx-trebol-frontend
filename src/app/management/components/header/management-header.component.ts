/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from 'src/models/entities/Image';
import { ManagementRoutingService } from '../../management-routing.service';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.css']
})
export class ManagementHeaderComponent
  implements OnInit {

  readonly appTitle: string = environment.labels.name;
  readonly appLogo: Image = environment.staticImages.logo;

  moduleName$: Observable<string>;

  constructor(
    private routingService: ManagementRoutingService
  ) { }

  ngOnInit(): void {
    this.moduleName$ = this.routingService.currentPageName$.pipe();
  }

}

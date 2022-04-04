/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ManagementService } from 'src/app/management/management.service';
import { environment } from 'src/environments/environment';
import { Image } from 'src/models/entities/Image';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.css']
})
export class ManagementHeaderComponent {

  readonly appTitle: string = environment.labels.name;
  readonly appLogo: Image = environment.staticImages.logo;

  moduleName$: Observable<string>;

  constructor(
    protected service: ManagementService
  ) {
    this.moduleName$ = this.service.currentPageName$.pipe();
  }

}

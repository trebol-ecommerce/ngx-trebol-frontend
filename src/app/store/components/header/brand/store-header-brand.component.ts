/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Image } from 'src/models/entities/Image';

@Component({
  selector: 'app-store-header-brand',
  templateUrl: './store-header-brand.component.html',
  styleUrls: ['./store-header-brand.component.css']
})
export class StoreHeaderBrandComponent {

  readonly appTitle: string = environment.labels.name;
  readonly appLogo: Image = environment.staticImages.logo;

  constructor() { }

}

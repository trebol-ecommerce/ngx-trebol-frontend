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
  selector: 'app-header-brand',
  templateUrl: './header-brand.component.html',
  styleUrls: ['./header-brand.component.css']
})
export class HeaderBrandComponent {

  readonly appTitle: string = environment.labels.name;
  readonly appLogo: Image = environment.staticImages.logo;

  constructor() { }

}

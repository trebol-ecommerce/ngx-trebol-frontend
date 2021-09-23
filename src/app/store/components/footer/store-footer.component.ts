/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store-footer',
  templateUrl: './store-footer.component.html',
  styleUrls: ['./store-footer.component.css']
})
export class StoreFooterComponent {

  footerParagraphs = environment.labels.footerParagraphs;

  constructor() { }
}

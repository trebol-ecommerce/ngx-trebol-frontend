/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-management-footer',
  templateUrl: './management-footer.component.html',
  styleUrls: ['./management-footer.component.css']
})
export class ManagementFooterComponent {

  footerParagraphs = environment.labels.footerParagraphs;

  constructor() { }

}

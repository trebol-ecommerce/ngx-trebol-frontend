/*
 * Copyright (c) 2022 The Trebol eCommerce Project
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

  readonly footerParagraphs = environment.labels.footerParagraphs;
  readonly whatsappUrlSafeNumber = `${environment.whatsapp.areaCode}${environment.whatsapp.urlSafePhone}`;
  readonly whatsappNumber = `${environment.whatsapp.areaCode} ${environment.whatsapp.phone}`;
  readonly contactInfo = environment.contactInfo;

  constructor() { }
}

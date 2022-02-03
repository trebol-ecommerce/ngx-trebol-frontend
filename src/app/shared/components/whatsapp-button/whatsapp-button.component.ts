/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css']
})
export class WhatsappButtonComponent {

  @Input() areaCode = '+56';
  @Input() phone: number | string = '';
  @Input() size = '3rem';
  @Input() padding = '1.25rem';

  get url(): string | undefined {
    return this.areaCode && this.phone ? `https://wa.me/${this.areaCode}${this.phone}` : undefined;
  }

  constructor() { }
}

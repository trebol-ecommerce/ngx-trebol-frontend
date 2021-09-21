/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-store-footer',
  templateUrl: './store-footer.component.html',
  styleUrls: ['./store-footer.component.css']
})
export class StoreFooterComponent {

  footerText = 'Todos los derechos reservados';

  constructor() { }
}

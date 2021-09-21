/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-management-footer',
  templateUrl: './management-footer.component.html',
  styleUrls: ['./management-footer.component.css']
})
export class ManagementFooterComponent {

  footerText = 'Todos los derechos reservados.';

  constructor() { }

}

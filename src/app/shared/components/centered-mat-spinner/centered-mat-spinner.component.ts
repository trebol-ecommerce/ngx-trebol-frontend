/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-centered-mat-spinner',
  template: `<mat-spinner></mat-spinner>`,
  styles: [
    `:host {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;
      justify-items: center;
      overflow: hidden;
    }`
  ]
})
export class CenteredMatProgressSpinnerComponent {

  constructor() { }

}

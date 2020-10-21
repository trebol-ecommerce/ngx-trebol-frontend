// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component } from '@angular/core';

@Component({
  selector: 'centered-mat-spinner',
  template: `<div><mat-spinner></mat-spinner></div>`,
  styles: [
    `div {
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

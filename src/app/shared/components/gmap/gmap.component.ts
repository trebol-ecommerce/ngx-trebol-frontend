/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent {

  url = '';
  @Input() set id(value: string) { this.url = `https://www.google.com/maps/embed?pb=${value}`; }
  @Input() width: number = 600;
  @Input() height: number = 450;

  constructor() {
    this.id = environment.googleMapsId;
  }

}

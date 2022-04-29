/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/models/entities/Address';

@Pipe({ name: 'address' })
export class AddressPipe
  implements PipeTransform {

  commentLabel = $localize`:address comments|Label preceding comments made for an address:Note`;

  transform(value: Address, ...args: unknown[]): unknown {
    return (value.firstLine +
      (value.secondLine ? `, ${value.secondLine}` : '') +
      `, ${value.city}, ${value.municipality}` +
      (value.notes ? ` (${this.commentLabel}: ${value.notes})` : ''));
  }

}

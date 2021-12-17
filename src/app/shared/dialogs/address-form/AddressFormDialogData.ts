/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Address } from 'src/models/entities/Address';

export interface AddressFormDialogData {
  address: Address;
  readOnly?: boolean;
  title?: string;
  hint?: string;
}

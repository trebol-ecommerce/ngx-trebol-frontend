/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ReceiptDetail } from './ReceiptDetail';

export class Receipt {
  buyOrder: number;
  amount: number;
  details: ReceiptDetail[];
  date: string;
  status: string;
  token?: string;
  taxValue?: number;
  transportValue?: number;
  totalValue?: number;
  totalItems?: number;
}

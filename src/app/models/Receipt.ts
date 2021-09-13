// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReceiptDetail } from './ReceiptDetail';

export class Receipt {

  public buyOrder: number;
  public amount: number;
  public details: ReceiptDetail[];
  public date: string;
  public status: string;
}

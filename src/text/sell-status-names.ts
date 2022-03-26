/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export const SELL_STATUS_NAMES_MAP = new Map<number, string>([
  [+6, $localize`:Description of status of a sell after its contents have been delivered to the customer:Delivery Complete`],
  [+5, $localize`:Description of status of a sell after it has been shipped:Delivery En Route`],
  [+4, $localize`:Description of status of a sell after being acknowledged and confirmed by a salesperson, store clerk, or the next responsible individual:Paid, Confirmed`],
  [+3, $localize`:Description of status of a sell once payment has been processed, and needs confirmation from the store:Paid, Unconfirmed`],
  [+2, $localize`:Description of status of a sell once payment is requested; the customer must proceed to execute their transaction:Payment Started`],
  [+1, $localize`:Description of status of a sell right before requesting payment; customers may never see this state:Pending`],
  [-1, $localize`:Description of a failed sell due to the transaction being aborted:Payment Cancelled`],
  [-2, $localize`:Description of a failed sell due to an uncertain transaction error:Payment Failed`],
  [-3, $localize`:Description of a failed sell due to rejection of transaction (most likely, the card was declined):Payment Rejected`],
  [-4, $localize`:Description of a failed sell due to abortion of the delivery process:Delivery Cancelled`],
  [-5, $localize`:Description of a failed sell due to a failure in the delivery process:Delivery Failed`],
  [-6, $localize`:Description of a failed sell due to its contents being returned:Returned`]
]);

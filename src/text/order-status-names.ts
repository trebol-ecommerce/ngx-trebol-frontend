/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export const ORDER_STATUS_LOCALIZED_MAP = new Map<string, string>([
  ['Delivery Complete',  $localize`:Description of status of a order after its contents have been delivered to the customer:Delivery Complete`],
  ['Delivery En Route',  $localize`:Description of status of a order after it has been shipped:Delivery En Route`],
  ['Paid, Confirmed',    $localize`:Description of status of a order after being acknowledged and confirmed by a salesperson, store clerk, or the next responsible individual:Paid, Confirmed`],
  ['Paid, Unconfirmed',  $localize`:Description of status of a order once payment has been processed, and needs confirmation from the store:Paid, Unconfirmed`],
  ['Payment Started',    $localize`:Description of status of a order once payment is requested; the customer must proceed to execute their transaction:Payment Started`],
  ['Pending',            $localize`:Description of status of a order right before requesting payment; customers may never see this state:Pending`],
  ['Payment Cancelled',  $localize`:Description of a failed order due to the transaction being aborted:Payment Cancelled`],
  ['Payment Failed',     $localize`:Description of a failed order due to an uncertain transaction error:Payment Failed`],
  ['Payment Rejected',   $localize`:Description of a failed order due to rejection of transaction (most likely, the card was declined):Payment Rejected`],
  ['Delivery Cancelled', $localize`:Description of a failed order due to abortion of the delivery process:Delivery Cancelled`],
  ['Delivery Failed',    $localize`:Description of a failed order due to a failure in the delivery process:Delivery Failed`],
  ['Returned',           $localize`:Description of a failed order due to its contents being returned:Returned`]
]);

export const ORDER_STATUS_NAMES_MAP = new Map<number, string>([
  [+6, $localize`:Description of status of a order after its contents have been delivered to the customer:Delivery Complete`],
  [+5, $localize`:Description of status of a order after it has been shipped:Delivery En Route`],
  [+4, $localize`:Description of status of a order after being acknowledged and confirmed by a salesperson, store clerk, or the next responsible individual:Paid, Confirmed`],
  [+3, $localize`:Description of status of a order once payment has been processed, and needs confirmation from the store:Paid, Unconfirmed`],
  [+2, $localize`:Description of status of a order once payment is requested; the customer must proceed to execute their transaction:Payment Started`],
  [+1, $localize`:Description of status of a order right before requesting payment; customers may never see this state:Pending`],
  [-1, $localize`:Description of a failed order due to the transaction being aborted:Payment Cancelled`],
  [-2, $localize`:Description of a failed order due to an uncertain transaction error:Payment Failed`],
  [-3, $localize`:Description of a failed order due to rejection of transaction (most likely, the card was declined):Payment Rejected`],
  [-4, $localize`:Description of a failed order due to abortion of the delivery process:Delivery Cancelled`],
  [-5, $localize`:Description of a failed order due to a failure in the delivery process:Delivery Failed`],
  [-6, $localize`:Description of a failed order due to its contents being returned:Returned`]
]);

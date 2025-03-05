/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ORDER_STATUS_NAMES_MAP } from "src/text/order-status-names";

export const MOCK_ORDER_STATUSES = {
  delivered: ORDER_STATUS_NAMES_MAP.get(6),
  sent: ORDER_STATUS_NAMES_MAP.get(5),
  confirmed: ORDER_STATUS_NAMES_MAP.get(4),
  paid: ORDER_STATUS_NAMES_MAP.get(3),
  unpaid: ORDER_STATUS_NAMES_MAP.get(2),
  pending: ORDER_STATUS_NAMES_MAP.get(1),
  aborted: ORDER_STATUS_NAMES_MAP.get(-1),
  failed: ORDER_STATUS_NAMES_MAP.get(-2),
  rejected: ORDER_STATUS_NAMES_MAP.get(-3),
  deliveryCancelled: ORDER_STATUS_NAMES_MAP.get(-4),
  deliveryFailed: ORDER_STATUS_NAMES_MAP.get(-5),
  returned: ORDER_STATUS_NAMES_MAP.get(-6)
};

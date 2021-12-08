import { SELL_STATUS_NAMES_MAP } from "src/text/sell-status-names";

export const MOCK_SELL_STATUSES = {
  delivered: SELL_STATUS_NAMES_MAP.get(6),
  sent: SELL_STATUS_NAMES_MAP.get(5),
  confirmed: SELL_STATUS_NAMES_MAP.get(4),
  paid: SELL_STATUS_NAMES_MAP.get(3),
  unpaid: SELL_STATUS_NAMES_MAP.get(2),
  pending: SELL_STATUS_NAMES_MAP.get(1),
  aborted: SELL_STATUS_NAMES_MAP.get(-1),
  failed: SELL_STATUS_NAMES_MAP.get(-2),
  rejected: SELL_STATUS_NAMES_MAP.get(-3),
  deliveryCancelled: SELL_STATUS_NAMES_MAP.get(-4),
  deliveryFailed: SELL_STATUS_NAMES_MAP.get(-5),
  returned: SELL_STATUS_NAMES_MAP.get(-6)
};

/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { BillingType } from 'src/models/entities/BillingType';
import { BILLING_TYPE_COMPANY, BILLING_TYPE_INDIVIDUAL, BILLING_TYPE_NAMES_MAP } from 'src/text/billing-type-names';

export const MOCK_BILLING_TYPES: BillingType[] = [
  { name: BILLING_TYPE_NAMES_MAP.get(BILLING_TYPE_INDIVIDUAL) },
  { name: BILLING_TYPE_NAMES_MAP.get(BILLING_TYPE_COMPANY) }
];

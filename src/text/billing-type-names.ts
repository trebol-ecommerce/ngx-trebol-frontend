/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

// Used in form values and external API
export const BILLING_TYPE_INDIVIDUAL = 'Bill';
export const BILLING_TYPE_COMPANY    = 'Enterprise Invoice';

export const BILLING_TYPE_NAMES_MAP = new Map<string, string>([
  [BILLING_TYPE_INDIVIDUAL, $localize`:Form of billing commonly requested by most people; a simple statement with details of goods and services:Bill`],
  [BILLING_TYPE_COMPANY,    $localize`:Form of billing requested by companies or their representatives; in addition to goods and services, some additional notes or charges (like taxes) may be included:Enterprise Invoice`]
]);

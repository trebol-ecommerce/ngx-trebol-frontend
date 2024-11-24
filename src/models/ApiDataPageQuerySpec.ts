/*
 * Copyright (c) 2024 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * Standardized structure for requesting pages of data
 */
export interface ApiDataPageQuerySpec {
  /** 0-based index of page */
  pageIndex: number;
  /** Number of elements expected in the page */
  pageSize: number;
  /** Name of parameter or metadata field to sort elements by */
  sortBy?: string;
  /** Direction of sorting (ascending/descending) */
  order?: string;
  /** Parameters to filter results by */
  filters?: any;
  /** Override value for max supported integer */
  maxIntegerValue?: number;
}

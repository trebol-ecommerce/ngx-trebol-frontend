/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export function paginateItems<T>(items: T[], pageIndex: number, pageSize: number): T[] {
  const firstIndex = (pageIndex * pageSize);
  const lastIndex = firstIndex + pageSize;
  return items.slice(firstIndex, lastIndex);
}

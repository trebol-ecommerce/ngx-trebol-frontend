/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export function regexMatchStartOfString(start: string): RegExp {
  const urlRegexPattern = `^${start}`;
  const urlRegex = new RegExp(urlRegexPattern);
  return urlRegex;
}

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export function regexMatchStartOfString(start: string): RegExp {
  const urlRegexPattern = `^${start}`;
  const urlRegex = new RegExp(urlRegexPattern);
  return urlRegex;
}

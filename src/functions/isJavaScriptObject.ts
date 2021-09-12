/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * Returns true only if something is an actual JavaScript object; not null,
 * not an array of objects, or anything else.
 *
 * Taken from https://stackoverflow.com/a/8511350/2336212
 * @param variable something
 */
export function isJavaScriptObject(variable: any): boolean {
  return (typeof variable === 'object'
    && variable !== null
    && !Array.isArray(variable));
}

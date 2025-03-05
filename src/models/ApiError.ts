/*
 * Copyright (c) 2024 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export class ApiError {
  code: string;
  message: string;
  detailMessage: string;
  canRetry: boolean;
}

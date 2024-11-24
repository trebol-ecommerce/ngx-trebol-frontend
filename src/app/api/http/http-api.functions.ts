/*
 * Copyright (c) 2024 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpParams } from "@angular/common/http";
import { ApiDataPageQuerySpec } from "src/models/ApiDataPageQuerySpec";

export function makeFetchHttpParams(p: ApiDataPageQuerySpec): HttpParams {
  let params = (!!p.filters) ? new HttpParams({ fromObject: p.filters }) :
                               new HttpParams();
  if (!!p.pageIndex && p.pageIndex >= 0) {
    params = params.append('pageIndex', p.pageIndex.toString());
  }
  if (!!p.pageSize && p.pageSize > 0) {
    params = params.append('pageSize', p.pageSize.toString());
  }
  if (!!p.sortBy) {
    params = params.append('sortBy', p.sortBy);
  }
  if (!!p.order) {
    params = params.append('order', p.order);
  }
  return params;
}

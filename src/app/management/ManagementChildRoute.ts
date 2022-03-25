/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Route } from '@angular/router';

// TODO move this interface to a new file

export interface ManagementChildRoute extends Route {
  data: { matIcon: string; title: string; };
}

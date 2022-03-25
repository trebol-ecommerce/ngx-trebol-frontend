/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { AddressPipe } from './address.pipe';

describe('AddressPipe', () => {
  it('create an instance', () => {
    const pipe = new AddressPipe();
    expect(pipe).toBeTruthy();
  });
});

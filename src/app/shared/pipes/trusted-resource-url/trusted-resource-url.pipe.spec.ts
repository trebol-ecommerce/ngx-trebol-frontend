/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { waitForAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { TrustedResourceUrlPipe } from './trusted-resource-url.pipe';

describe('TrustedResourceUrlPipe', () => {
  let mockDomSanitizer: Partial<DomSanitizer>;

  beforeEach(waitForAsync(() => {
    // TODO use jasmine.SpyObj
    mockDomSanitizer = {
      bypassSecurityTrustResourceUrl() { return void 0; }
    };
  }));

  it('should create an instance', () => {
    const pipe = new TrustedResourceUrlPipe(mockDomSanitizer as DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});

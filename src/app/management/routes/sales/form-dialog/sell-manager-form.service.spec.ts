// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { SellManagerFormService } from './sell-manager-form.service';

describe('SellManagerFormService', () => {
  let service: SellManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        SellManagerFormService
      ]
    });
    service = TestBed.inject(SellManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

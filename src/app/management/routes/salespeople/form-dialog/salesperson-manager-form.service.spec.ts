// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { SalespersonManagerFormService } from './salesperson-manager-form.service';

describe('SalespersonManagerFormService', () => {
  let service: SalespersonManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        SalespersonManagerFormService
      ]
    });
    service = TestBed.inject(SalespersonManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

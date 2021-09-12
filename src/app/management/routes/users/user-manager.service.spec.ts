// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { UserManagerService } from './user-manager.service';

describe('UserManagerService', () => {
  let service: UserManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        UserManagerService
      ]
    });
    service = TestBed.inject(UserManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

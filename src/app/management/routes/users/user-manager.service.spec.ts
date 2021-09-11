// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/local-memory/local-memory-data-api.module';
import { UserManagerService } from './user-manager.service';

describe('UserManagerService', () => {
  let service: UserManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
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

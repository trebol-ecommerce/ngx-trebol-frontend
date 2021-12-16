/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Person } from 'src/app/models/entities/Person';
import { EditProfileFormService } from './edit-profile-form.service';

describe('EditProfileFormService', () => {
  let service: EditProfileFormService;
  let appService: Partial<AppService>;

  beforeEach(() => {
    appService = {
      getUserProfile() { return of(new Person()); },
      updateUserProfile(p) { return of(true); }
    };

    TestBed.configureTestingModule({
      providers: [
        EditProfileFormService,
        { provide: AppService, useValue: appService }
      ]
    });
    service = TestBed.inject(EditProfileFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

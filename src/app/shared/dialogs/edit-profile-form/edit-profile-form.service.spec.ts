/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfileService } from 'src/app/profile.service';
import { Person } from 'src/models/entities/Person';
import { EditProfileFormService } from './edit-profile-form.service';

describe('EditProfileFormService', () => {
  let service: EditProfileFormService;
  let mockProfileService: Partial<ProfileService>;

  beforeEach(() => {
    mockProfileService = {
      getUserProfile() { return of(new Person()); },
      updateUserProfile(p) { return of(true); }
    };

    TestBed.configureTestingModule({
      providers: [
        EditProfileFormService,
        { provide: ProfileService, useValue: mockProfileService }
      ]
    });
    service = TestBed.inject(EditProfileFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

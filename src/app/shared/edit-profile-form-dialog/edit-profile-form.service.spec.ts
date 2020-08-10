import { TestBed } from '@angular/core/testing';

import { EditProfileFormService } from './edit-profile-form.service';

describe('EditProfileFormService', () => {
  let service: EditProfileFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProfileFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

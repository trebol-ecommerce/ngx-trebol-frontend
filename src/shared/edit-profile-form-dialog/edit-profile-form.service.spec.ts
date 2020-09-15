import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';
import { EditProfileFormService } from './edit-profile-form.service';
import { AppUserService } from 'src/app/app-user.service';

describe('EditProfileFormService', () => {
  let service: EditProfileFormService;
  let userService: Partial<AppUserService>;

  beforeEach(() => {
    userService = {
      getCurrentSession() { return null; }
    };

    TestBed.configureTestingModule({
      providers: [
        EditProfileFormService,
        { provide: AppUserService, useValue: userService },
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(EditProfileFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

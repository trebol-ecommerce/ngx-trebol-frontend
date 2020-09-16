import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';
import { EditProfileFormService } from './edit-profile-form.service';
import { AppService } from 'src/app/app.service';

describe('EditProfileFormService', () => {
  let service: EditProfileFormService;
  let appService: Partial<AppService>;

  beforeEach(() => {
    appService = {
      getCurrentSession() { return null; }
    };

    TestBed.configureTestingModule({
      providers: [
        EditProfileFormService,
        { provide: AppService, useValue: appService },
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(EditProfileFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

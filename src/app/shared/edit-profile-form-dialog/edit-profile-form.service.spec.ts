import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { EditProfileFormService } from './edit-profile-form.service';

describe('EditProfileFormService', () => {
  let service: EditProfileFormService;
  let appService: Partial<AppService>;

  beforeEach(() => {
    appService = {
      isUserLoggedIn() { return null; },
      getUserProfile() { return of(null); },
      updateUserProfile(p) { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
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

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
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

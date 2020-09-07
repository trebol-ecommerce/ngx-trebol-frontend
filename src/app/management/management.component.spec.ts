import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';
import { of } from 'rxjs';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;
  let service: Partial<ManagementService>;

  beforeEach(async(() => {
    service = {
      isSidenavOpen$: of(true)
    };

    TestBed.configureTestingModule({
      declarations: [ ManagementComponent ],
      providers: [
        { provide: ManagementService, useValue: service },
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

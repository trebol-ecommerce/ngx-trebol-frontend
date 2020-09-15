import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DATA_INJECTION_TOKENS } from 'src/data/data-injection-tokens';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';
import { StoreCompanyDetailsDialogComponent } from './store-company-details-dialog.component';

describe('StoreCompanyDetailsDialogComponent', () => {
  let component: StoreCompanyDetailsDialogComponent;
  let fixture: ComponentFixture<StoreCompanyDetailsDialogComponent>;
  let service: Partial<SharedDataIService>;

  beforeEach(async(() => {
    service = {
      readCompanyDetails() { return of({ name: 'test', bannerImageURL: '', description: 'test', logoImageURL: '' }); }
    };

    TestBed.configureTestingModule({
      declarations: [ StoreCompanyDetailsDialogComponent ],
      providers: [
        { provide: DATA_INJECTION_TOKENS.shared, useValue: service }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCompanyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

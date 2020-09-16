import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Session } from 'src/app/data/models/entities/Session';
import { StoreService } from '../../store.service';
import { StorePaymentRedirectPromptDialogComponent } from './store-payment-redirect-prompt-dialog.component';

describe('StorePaymentRedirectPromptDialogComponent', () => {
  let component: StorePaymentRedirectPromptDialogComponent;
  let fixture: ComponentFixture<StorePaymentRedirectPromptDialogComponent>;
  let appService: Partial<AppService>;
  let storeService: Partial<StoreService>;

  beforeEach(async(() => {
    appService = {
      getCurrentSession() { return new Session(); }
    };
    storeService = {
      sellSubtotalValue$: of(0)
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ StorePaymentRedirectPromptDialogComponent ],
      providers: [
        { provide: AppService, useValue: appService },
        { provide: StoreService, useValue: storeService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePaymentRedirectPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

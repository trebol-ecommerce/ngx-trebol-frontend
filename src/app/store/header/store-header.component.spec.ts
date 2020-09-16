import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from 'src/app/app.service';
import { SharedModule } from 'src/shared/shared.module';
import { StoreService } from '../store.service';
import { StoreHeaderComponent } from './store-header.component';
import { of } from 'rxjs';

describe('StoreHeaderComponent', () => {
  let component: StoreHeaderComponent;
  let fixture: ComponentFixture<StoreHeaderComponent>;
  let cartService: Partial<StoreService>;
  let appService: Partial<AppService>;

  beforeEach(async(() => {
    cartService = {
      sellDetails$: of([]),
      itemQuantity$: of(0),
      sellSubtotalValue$: of(0)
    };
    appService = {
      getCurrentSession() { return null; },
      closeCurrentSession() {},
      sessionChanges$: of(null),
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ StoreHeaderComponent ],
      providers: [
        { provide: StoreService, useValue: cartService },
        { provide: AppService, useValue: appService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

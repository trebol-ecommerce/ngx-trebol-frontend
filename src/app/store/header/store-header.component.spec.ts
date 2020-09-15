import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppUserService } from 'src/app/app-user.service';
import { SharedModule } from 'src/shared/shared.module';
import { StoreCartService } from '../store-cart.service';
import { StoreHeaderComponent } from './store-header.component';
import { of } from 'rxjs';

describe('StoreHeaderComponent', () => {
  let component: StoreHeaderComponent;
  let fixture: ComponentFixture<StoreHeaderComponent>;
  let cartService: Partial<StoreCartService>;
  let userService: Partial<AppUserService>;

  beforeEach(async(() => {
    cartService = {
      sellDetails$: of([]),
      itemQuantity$: of(0),
      sellSubtotalValue$: of(0)
    };
    userService = {
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
        { provide: StoreCartService, useValue: cartService },
        { provide: AppUserService, useValue: userService }
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

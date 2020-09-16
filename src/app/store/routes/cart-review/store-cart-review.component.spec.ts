import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppUserService } from 'src/app/app-user.service';
import { LocalMemoryAuthModule } from 'src/auth/local-memory/local-memory-auth.module';
import { LocalMemoryDataModule } from 'src/data/services/local-memory/local-memory-data.module';
import { StoreService } from '../../store.service';
import { StoreCartReviewComponent } from './store-cart-review.component';

describe('StoreCartReviewComponent', () => {
  let component: StoreCartReviewComponent;
  let fixture: ComponentFixture<StoreCartReviewComponent>;
  let cartService: Partial<StoreService>;
  let userService: Partial<AppUserService>;

  beforeEach(async(() => {
    cartService = {
      sellDetails$: of([]),
      sellSubtotalValue$: of(0),
      increaseProductUnits(i) {},
      decreaseProductUnits(i) {},
      removeProductFromCart(i) {}
    };
    userService = {
      getCurrentSession() { return null; }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LocalMemoryDataModule,
        LocalMemoryAuthModule,
        MatDialogModule,
        MatSnackBarModule
      ],
      declarations: [ StoreCartReviewComponent ],
      providers: [
        { provide: StoreService, useValue: cartService },
        { provide: AppUserService, useValue: userService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

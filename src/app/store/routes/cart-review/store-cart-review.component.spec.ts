import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LocalMemoryAuthModule } from 'src/app/auth/local-memory/local-memory-auth.module';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { StoreService } from '../../store.service';
import { StoreCartReviewComponent } from './store-cart-review.component';

describe('StoreCartReviewComponent', () => {
  let component: StoreCartReviewComponent;
  let fixture: ComponentFixture<StoreCartReviewComponent>;
  let storeService: Partial<StoreService>;
  let appService: Partial<AppService>;

  beforeEach(async(() => {
    storeService = {
      sellDetails$: of([]),
      sellSubtotalValue$: of(0),
      increaseProductUnits(i) {},
      decreaseProductUnits(i) {},
      removeProductFromCart(i) {}
    };
    appService = {
      isUserLoggedIn() { return false; }
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
        { provide: StoreService, useValue: storeService },
        { provide: AppService, useValue: appService }
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Product } from 'src/data/models/entities/Product';
import { StoreService } from '../../store.service';
import { StoreProductDetailsDialogComponent } from './store-product-details-dialog.component';

describe('StoreProductDetailsDialogComponent', () => {
  let component: StoreProductDetailsDialogComponent;
  let fixture: ComponentFixture<StoreProductDetailsDialogComponent>;
  let cartService: Partial<StoreService>;

  beforeEach(async(() => {
    cartService = {
      sellDetails$: of([]),
      increaseProductUnits(i) {},
      addProductToCart(p) {},
      decreaseProductUnits(i) {}
    };

    TestBed.configureTestingModule({
      declarations: [ StoreProductDetailsDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: StoreService, useValue: cartService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCatalogProductCardComponent } from './store-catalog-product-card.component';
import { StoreCartService } from 'src/app/store/store-cart.service';
import { StoreCatalogService } from '../store-catalog.service';

describe('StoreCatalogProductCardComponent', () => {
  let component: StoreCatalogProductCardComponent;
  let fixture: ComponentFixture<StoreCatalogProductCardComponent>;
  let cartService: Partial<StoreCartService>;
  let catalogService: Partial<StoreCatalogService>;

  beforeEach(async(() => {
    cartService = {
      addProductToCart(p) {}
    };
    catalogService = {
      viewProduct(p) {}
    };

    TestBed.configureTestingModule({
      declarations: [ StoreCatalogProductCardComponent ],
      providers: [
        { provide: StoreCartService, useValue: cartService },
        { provide: StoreCatalogService, useValue: catalogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCatalogProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

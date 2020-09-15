import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCatalogProductCardComponent } from './store-catalog-product-card.component';
import { StoreService } from 'src/app/store/store.service';
import { StoreCatalogService } from '../store-catalog.service';

describe('StoreCatalogProductCardComponent', () => {
  let component: StoreCatalogProductCardComponent;
  let fixture: ComponentFixture<StoreCatalogProductCardComponent>;
  let cartService: Partial<StoreService>;
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
        { provide: StoreService, useValue: cartService },
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

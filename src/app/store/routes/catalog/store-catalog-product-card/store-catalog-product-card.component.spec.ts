import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCatalogProductCardComponent } from './store-catalog-product-card.component';

describe('StoreCatalogProductCardComponent', () => {
  let component: StoreCatalogProductCardComponent;
  let fixture: ComponentFixture<StoreCatalogProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCatalogProductCardComponent ]
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

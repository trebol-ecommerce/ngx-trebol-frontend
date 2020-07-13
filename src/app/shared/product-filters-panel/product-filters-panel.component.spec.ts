import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFiltersPanelComponent } from './product-filters-panel.component';

describe('ProductFiltersPanelComponent', () => {
  let component: ProductFiltersPanelComponent;
  let fixture: ComponentFixture<ProductFiltersPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFiltersPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFiltersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

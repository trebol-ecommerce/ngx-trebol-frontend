import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagerComponent } from './product-manager.component';

describe('ProductManagerComponent', () => {
  let component: ProductManagerComponent;
  let fixture: ComponentFixture<ProductManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

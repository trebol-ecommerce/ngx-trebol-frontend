import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreShippingFormComponent } from './store-shipping-form.component';

describe('StoreShippingFormComponent', () => {
  let component: StoreShippingFormComponent;
  let fixture: ComponentFixture<StoreShippingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreShippingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreShippingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

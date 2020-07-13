import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGuestShippingFormDialogComponent } from './store-guest-shipping-form-dialog.component';

describe('StoreGuestShippingFormDialogComponent', () => {
  let component: StoreGuestShippingFormDialogComponent;
  let fixture: ComponentFixture<StoreGuestShippingFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreGuestShippingFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGuestShippingFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderManagerFormDialogComponent } from './purchase-order-manager-form-dialog.component';

describe('PurchaseOrderManagerFormDialogComponent', () => {
  let component: PurchaseOrderManagerFormDialogComponent;
  let fixture: ComponentFixture<PurchaseOrderManagerFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderManagerFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

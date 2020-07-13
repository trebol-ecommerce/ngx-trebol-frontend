import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderManagerComponent } from './purchase-order-manager.component';

describe('MantenedorOrdenesCompraGestionComponent', () => {
  let component: PurchaseOrderManagerComponent;
  let fixture: ComponentFixture<PurchaseOrderManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

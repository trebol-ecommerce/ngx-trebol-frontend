import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SharedModule } from 'src/shared/shared.module';
import { PurchaseOrderManagerFormDialogComponent } from './purchase-order-manager-form-dialog.component';
import { PurchaseOrderManagerFormService } from './purchase-order-manager-form.service';

describe('PurchaseOrderManagerFormDialogComponent', () => {
  let component: PurchaseOrderManagerFormDialogComponent;
  let fixture: ComponentFixture<PurchaseOrderManagerFormDialogComponent>;
  let service: Partial<PurchaseOrderManagerFormService>;

  beforeEach(async(() => {
    service = {
      saving$: of(false),
      refreshPurchaseOrderDetailsFromId(i) {},
      getAllProviders() { return of([]); },
      getAllEmployees() { return of([]); },
      purchaseOrderDetails$: of([]),
      purchaseOrderSubtotalValue$: of(0),
      addProducts(p) {},
      increaseDetailProductQuantityAtIndex(i) {},
      decreaseDetailProductQuantityAtIndex(i) {},
      removeDetailAtIndex(i) {},
      submit(i) { return of(true) }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ PurchaseOrderManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(PurchaseOrderManagerFormService, { useValue: service });
    fixture = TestBed.createComponent(PurchaseOrderManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

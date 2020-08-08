import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from 'src/app/shared/angular-material.module';
import { PurchaseOrderManagerFormDialogComponent } from './purchase-order-manager-form-dialog.component';
import { PurchaseOrderManagerFormService } from './purchase-order-manager-form.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
        FormsModule,
        ...MATERIAL_MODULES
      ],
      declarations: [ PurchaseOrderManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: PurchaseOrderManagerFormService, useValue: service }
      ]
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

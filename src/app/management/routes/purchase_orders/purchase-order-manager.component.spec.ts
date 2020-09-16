import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from 'src/app/shared/angular-material.module';
import { PurchaseOrderManagerComponent } from './purchase-order-manager.component';
import { PurchaseOrderManagerService } from './purchase-order-manager.service';

describe('PurchaseOrderManagerComponent', () => {
  let component: PurchaseOrderManagerComponent;
  let fixture: ComponentFixture<PurchaseOrderManagerComponent>;
  let managerService: Partial<PurchaseOrderManagerService>;

  beforeEach(async(() => {
    managerService = {
      removeItems() { return of([true]); },
      reloadItems() {},
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([])
    };

    TestBed.configureTestingModule({
      imports: [
        ...MATERIAL_MODULES
      ],
      declarations: [ PurchaseOrderManagerComponent ],
      providers: [
        { provide: PurchaseOrderManagerService, useValue: managerService }
      ]
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

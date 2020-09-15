import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from 'src/shared/angular-material.module';
import { ProductManagerComponent } from './product-manager.component';
import { ProductManagerService } from './product-manager.service';

describe('ProductManagerComponent', () => {
  let component: ProductManagerComponent;
  let fixture: ComponentFixture<ProductManagerComponent>;
  let managerService: Partial<ProductManagerService>;

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
      declarations: [ ProductManagerComponent ],
      providers: [
        { provide: ProductManagerService, useValue: managerService }
      ]
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

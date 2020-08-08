import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductManagerFormDialogComponent } from './product-manager-form-dialog.component';
import { ProductManagerFormService } from './product-manager-form.service';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ProductManagerFormDialogComponent', () => {
  let component: ProductManagerFormDialogComponent;
  let fixture: ComponentFixture<ProductManagerFormDialogComponent>;
  let service: Partial<ProductManagerFormService>;

  beforeEach(async(() => {
    service = {
      saving$: of(false),
      productTypes$: of([]),
      getAllProductFamilies() { return of([]); },
      updateSelectedFamily(i) {},
      submit(i) { return of(true); }
    };

    TestBed.configureTestingModule({
      declarations: [ ProductManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: ProductManagerFormService, useValue: service}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

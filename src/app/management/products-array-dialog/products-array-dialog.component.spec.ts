import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsArrayDialogComponent } from './products-array-dialog.component';

describe('AgregarProductoDialogComponent', () => {
  let component: ProductsArrayDialogComponent;
  let fixture: ComponentFixture<ProductsArrayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsArrayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsArrayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

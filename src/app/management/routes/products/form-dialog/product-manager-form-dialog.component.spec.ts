import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagerFormDialogComponent } from './product-manager-form-dialog.component';

describe('ProductManagerFormDialogComponent', () => {
  let component: ProductManagerFormDialogComponent;
  let fixture: ComponentFixture<ProductManagerFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductManagerFormDialogComponent ]
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

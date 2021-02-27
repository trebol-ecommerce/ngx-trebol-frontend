import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHeaderBrandComponent } from './store-header-brand.component';

describe('StoreHeaderBrandComponent', () => {
  let component: StoreHeaderBrandComponent;
  let fixture: ComponentFixture<StoreHeaderBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreHeaderBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

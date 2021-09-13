import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHeaderMiddleComponent } from './store-header-middle.component';

describe('StoreHeaderMiddleComponent', () => {
  let component: StoreHeaderMiddleComponent;
  let fixture: ComponentFixture<StoreHeaderMiddleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreHeaderMiddleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHeaderComponent } from './store-header.component';

describe('StoreHeaderComponent', () => {
  let component: StoreHeaderComponent;
  let fixture: ComponentFixture<StoreHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

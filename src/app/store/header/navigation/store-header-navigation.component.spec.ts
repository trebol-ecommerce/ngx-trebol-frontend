import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHeaderNavigationComponent } from './store-header-navigation.component';

describe('StoreHeaderNavigationComponent', () => {
  let component: StoreHeaderNavigationComponent;
  let fixture: ComponentFixture<StoreHeaderNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreHeaderNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHeaderLoginButtonComponent } from './store-header-login-button.component';

describe('StoreHeaderLoginButtonComponent', () => {
  let component: StoreHeaderLoginButtonComponent;
  let fixture: ComponentFixture<StoreHeaderLoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreHeaderLoginButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

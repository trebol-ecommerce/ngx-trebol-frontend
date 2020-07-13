import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLoginFormDialogComponent } from './store-login-form-dialog.component';

describe('StoreLoginFormDialogComponent', () => {
  let component: StoreLoginFormDialogComponent;
  let fixture: ComponentFixture<StoreLoginFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLoginFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

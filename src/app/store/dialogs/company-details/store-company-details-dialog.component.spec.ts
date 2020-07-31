import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCompanyDetailsDialogComponent } from './store-company-details-dialog.component';

describe('StoreCompanyDetailsDialogComponent', () => {
  let component: StoreCompanyDetailsDialogComponent;
  let fixture: ComponentFixture<StoreCompanyDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCompanyDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCompanyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

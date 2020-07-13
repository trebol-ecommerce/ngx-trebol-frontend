import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManagerFormDialogComponent } from './employee-manager-form-dialog.component';

describe('EmployeeManagerFormDialogComponent', () => {
  let component: EmployeeManagerFormDialogComponent;
  let fixture: ComponentFixture<EmployeeManagerFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeManagerFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

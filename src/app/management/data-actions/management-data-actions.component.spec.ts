import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDataActionsComponent } from './management-data-actions.component';

describe('ManagementDataActionsComponent', () => {
  let component: ManagementDataActionsComponent;
  let fixture: ComponentFixture<ManagementDataActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementDataActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementDataActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSidenavComponent } from './management-sidenav.component';

describe('ManagementSidenavComponent', () => {
  let component: ManagementSidenavComponent;
  let fixture: ComponentFixture<ManagementSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

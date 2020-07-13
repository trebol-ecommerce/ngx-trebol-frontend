import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementFooterComponent } from './management-footer.component';

describe('ManagementFooterComponent', () => {
  let component: ManagementFooterComponent;
  let fixture: ComponentFixture<ManagementFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

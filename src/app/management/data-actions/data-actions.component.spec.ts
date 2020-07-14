import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataActionsComponent } from './data-actions.component';

describe('DataActionsComponent', () => {
  let component: DataActionsComponent;
  let fixture: ComponentFixture<DataActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

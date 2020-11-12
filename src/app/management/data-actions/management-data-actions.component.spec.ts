// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ManagementDataActionsComponent } from './management-data-actions.component';

describe('ManagementDataActionsComponent', () => {
  let component: ManagementDataActionsComponent;
  let fixture: ComponentFixture<ManagementDataActionsComponent>;

  beforeEach(waitForAsync(() => {
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

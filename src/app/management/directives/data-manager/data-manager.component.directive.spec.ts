/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataManagerComponentDirective } from './data-manager.component.directive';
import { DataManagerServiceDirective } from './data-manager.service.directive';

@Component({
  selector: 'app-data-manager',
  template: '<div></div>'
})
class MockDataManagerComponent
  extends DataManagerComponentDirective<any> {
  constructor(
    protected service: DataManagerServiceDirective<any>
  ) {
    super();
  }
}

describe('DataManagerComponentDirective', () => {
  let component: MockDataManagerComponent;
  let componentFixture: ComponentFixture<MockDataManagerComponent>;
  let mockService: Partial<DataManagerServiceDirective<any>>;

  beforeEach(waitForAsync(() => {
    mockService = {
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([]),
      totalCount$: of(0),
      canEdit$: of(false),
      canAdd$: of(false),
      canDelete$: of(false)
    };

    TestBed.configureTestingModule({
      declarations: [
        MockDataManagerComponent
      ],
      providers: [
        { provide: DataManagerServiceDirective, useValue: mockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    componentFixture = TestBed.createComponent(MockDataManagerComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

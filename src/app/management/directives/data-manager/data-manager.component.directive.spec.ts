/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { DataManagerComponentDirective } from './data-manager.component.directive';
import { DataManagerServiceDirective } from './data-manager.service.directive';

@Component({
  selector: 'app-data-manager',
  template: '<div></div>'
})
class MockDataManagerComponent
  extends DataManagerComponentDirective<any> {

  constructor(
    protected service: DataManagerServiceDirective<any>,
    protected route: ActivatedRoute
  ) {
    super();
  }
}

describe('DataManagerComponentDirective', () => {
  let component: MockDataManagerComponent;
  let componentFixture: ComponentFixture<MockDataManagerComponent>;
  let serviceSpy: jasmine.SpyObj<DataManagerServiceDirective<any>>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('DataManagerServiceDirective<any>', ['reloadItems']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([ { path: '', component: MockDataManagerComponent } ])
      ],
      declarations: [
        MockDataManagerComponent
      ],
      providers: [
        { provide: DataManagerServiceDirective, useValue: mockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = TestBed.inject(DataManagerServiceDirective) as jasmine.SpyObj<DataManagerServiceDirective<any>>;
    serviceSpy.reloadItems.and.returnValue(EMPTY);
    serviceSpy.loading$ = of(false);
    serviceSpy.focusedItems$ = of([]);
    serviceSpy.items$ = of([]);
    serviceSpy.totalCount$ = of(0);

    componentFixture = TestBed.createComponent(MockDataManagerComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

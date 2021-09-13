// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreComponent } from './store.component';
import { Component } from '@angular/core';

@Component({ selector: 'router-outlet' })
class MockRouterOutletComponent { }
@Component({ selector: 'app-store-header' })
class MockHeaderComponent { }
@Component({ selector: 'app-store-footer' })
class MockFooterComponent { }

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreComponent,
        MockRouterOutletComponent,
        MockHeaderComponent,
        MockFooterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

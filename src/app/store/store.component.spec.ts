// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreComponent } from './store.component';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from './store.service';
import { of } from 'rxjs';

@Component({ selector: 'router-outlet' })
class MockRouterOutletComponent { }
@Component({ selector: 'app-store-header' })
class MockHeaderComponent { }
@Component({ selector: 'app-store-footer' })
class MockFooterComponent { }

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;
  let mockStoreService: Partial<StoreService>;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
      cartDetails$: of([])
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        StoreComponent,
        MockRouterOutletComponent,
        MockHeaderComponent,
        MockFooterComponent
      ],
      providers: [
        { provide: StoreService, useValue: mockStoreService }
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

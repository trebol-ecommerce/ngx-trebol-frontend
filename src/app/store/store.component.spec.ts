/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StoreComponent } from './store.component';
import { StoreService } from './store.service';

// eslint-disable-next-line @angular-eslint/component-selector
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

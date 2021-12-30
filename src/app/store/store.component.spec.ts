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
import { StoreCartService } from './store-cart.service';

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
  let mockCartService: Partial<StoreCartService>;

  beforeEach(waitForAsync(() => {
    mockCartService = {
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
        { provide: StoreCartService, useValue: mockCartService }
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

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SessionService } from '../session.service';
import { StoreCartService } from './store-cart.service';
import { StoreComponent } from './store.component';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'router-outlet' })
class MockRouterOutletComponent { }

@Component({ selector: 'app-store-header' })
class MockHeaderComponent { }

@Component({ selector: 'app-store-footer' })
class MockFooterComponent { }

@Component({ selector: 'app-whatsapp-button' })
class MockWhatsappButtonComponent { }

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;
  let mockCartService: Partial<StoreCartService>;
  let mockSessionService: Partial<SessionService>;

  beforeEach(waitForAsync(() => {
    mockCartService = {
      cartDetails$: of([])
    };
    mockSessionService = {
      userHasActiveSession$: of(false)
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        StoreComponent,
        MockRouterOutletComponent,
        MockHeaderComponent,
        MockFooterComponent,
        MockWhatsappButtonComponent
      ],
      providers: [
        { provide: StoreCartService, useValue: mockCartService },
        { provide: SessionService, useValue: mockSessionService },
      ]
    }).compileComponents();
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

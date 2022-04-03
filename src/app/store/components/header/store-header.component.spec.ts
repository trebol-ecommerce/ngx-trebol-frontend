/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SessionService } from 'src/app/session.service';
import { StoreHeaderComponent } from './store-header.component';

@Component({ selector: 'app-store-header-brand' })
class MockStoreHeaderBrandComponent { }

@Component({ selector: 'app-store-header-navigation' })
class MockStoreHeaderNavigationComponent { }

@Component({ selector: 'app-store-header-search-form' })
class MockStoreHeaderSearchFormComponent { }

@Component({ selector: 'app-store-header-menu' })
class MockStoreHeaderMenuComponent { }

@Component({ selector: 'app-store-header-login-button' })
class MockStoreHeaderLoginButtonComponent { }

describe('StoreHeaderComponent', () => {
  let component: StoreHeaderComponent;
  let fixture: ComponentFixture<StoreHeaderComponent>;
  let mockSessionService: Partial<SessionService>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockSessionService = {
      userHasActiveSession$: of(false)
    };
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        StoreHeaderComponent,
        MockStoreHeaderBrandComponent,
        MockStoreHeaderNavigationComponent,
        MockStoreHeaderSearchFormComponent,
        MockStoreHeaderMenuComponent,
        MockStoreHeaderLoginButtonComponent
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreHeaderComponent } from './store-header.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({ selector: 'app-store-header-brand', template: '' })
class MockStoreHeaderBrandComponent { }

@Component({ selector: 'app-store-header-navigation', template: '' })
class MockStoreHeaderNavigationComponent { }

@Component({ selector: 'app-store-header-middle', template: '' })
class MockStoreHeaderMiddleComponent { }

@Component({ selector: 'app-store-header-menu', template: '' })
class MockStoreHeaderMenuComponent { }

@Component({ selector: 'app-store-header-login-button', template: '' })
class MockStoreHeaderLoginButtonComponent { }

describe('StoreHeaderComponent', () => {
  let component: StoreHeaderComponent;
  let fixture: ComponentFixture<StoreHeaderComponent>;
  let mockAppService: Partial<AppService>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockAppService = {
      isLoggedIn() { return false; },
      isLoggedInChanges$: of(false)
    };
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
      ],
      declarations: [
        StoreHeaderComponent,
        MockStoreHeaderBrandComponent,
        MockStoreHeaderNavigationComponent,
        MockStoreHeaderMiddleComponent,
        MockStoreHeaderMenuComponent,
        MockStoreHeaderLoginButtonComponent
      ],
      providers: [
        { provide: AppService, useValue: mockAppService },
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

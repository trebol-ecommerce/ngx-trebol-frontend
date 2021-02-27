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
import { StoreHeaderBrandComponent } from './brand/store-header-brand.component';
import { StoreHeaderNavigationComponent } from './navigation/store-header-navigation.component';
import { StoreHeaderMiddleComponent } from './middle/store-header-middle.component';
import { StoreHeaderMenuComponent } from './menu/store-header-menu.component';
import { StoreHeaderLoginButtonComponent } from './login-button/store-header-login-button.component';
import { StoreService } from '../store.service';

describe('StoreHeaderComponent', () => {
  let component: StoreHeaderComponent;
  let fixture: ComponentFixture<StoreHeaderComponent>;
  let mockAppService: Partial<AppService>;
  let mockDialogService: Partial<MatDialog>;
  let mockStoreService: Partial<StoreService>;

  beforeEach(waitForAsync(() => {
    mockAppService = {
      isLoggedIn() { return false; },
      isLoggedInChanges$: of(false)
    };
    mockDialogService = {
      open() { return void 0; }
    };
    mockStoreService = {
      cartDetails$: of([]),
      cartItemCount$: of(0),
      cartSubtotalValue$: of(0),
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule
      ],
      declarations: [
        StoreHeaderComponent,
        StoreHeaderBrandComponent,
        StoreHeaderNavigationComponent,
        StoreHeaderMiddleComponent,
        StoreHeaderMenuComponent,
        StoreHeaderLoginButtonComponent
      ],
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: StoreService, useValue: mockStoreService },
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

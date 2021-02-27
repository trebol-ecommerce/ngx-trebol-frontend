// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreHeaderComponent } from './store-header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreHeaderBrandComponent } from './brand/store-header-brand.component';
import { StoreHeaderNavigationComponent } from './navigation/store-header-navigation.component';
import { StoreHeaderMiddleComponent } from './middle/store-header-middle.component';
import { StoreHeaderMenuComponent } from './menu/store-header-menu.component';
import { StoreHeaderLoginButtonComponent } from './login-button/store-header-login-button.component';

describe('StoreHeaderComponent', () => {
  let component: StoreHeaderComponent;
  let fixture: ComponentFixture<StoreHeaderComponent>;
  let mockAppService: Partial<AppService>;

  beforeEach(waitForAsync(() => {
    mockAppService = {
      isLoggedIn() { return false; },
      isLoggedInChanges$: of(false)
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule
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
        { provide: AppService, useValue: mockAppService }
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

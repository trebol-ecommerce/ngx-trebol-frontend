/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreHeaderMenuComponent } from './store-header-menu.component';

describe('StoreHeaderMenuComponent', () => {
  let component: StoreHeaderMenuComponent;
  let fixture: ComponentFixture<StoreHeaderMenuComponent>;
  let mockAppService: Partial<AppService>;
  let mockDialogService: Partial<MatDialog>;
  let mockSnackBarService: Partial<MatSnackBar>;
  let dialogOpenSpy: jasmine.Spy;

  beforeEach(waitForAsync( () => {
    mockAppService = {
      isLoggedIn() { return false; },
      isLoggedInChanges$: of(false),
      closeCurrentSession() {},
      getUserProfile() { return of(null); }
    };
    mockDialogService = {
      open() { return void 0; }
    };
    mockSnackBarService = {
      open() { return void 0; }
    };
    dialogOpenSpy = spyOn(mockDialogService, 'open')
                      .and.returnValue({ afterClosed: () => of(false) } as MatDialogRef<any>);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [ StoreHeaderMenuComponent ],
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: MatSnackBar, useValue: mockSnackBarService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prompt a logout confirmation, only when logged in', () => {
    component.onClickLogout();
    expect(dialogOpenSpy).not.toHaveBeenCalled();

    mockAppService.isLoggedInChanges$ = of(true);
    mockAppService.isLoggedIn = (() => true);
    component.onClickLogout();
    expect(dialogOpenSpy).toHaveBeenCalled();
  });
});

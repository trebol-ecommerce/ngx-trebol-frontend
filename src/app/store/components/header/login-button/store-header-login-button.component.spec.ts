/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { StoreHeaderLoginButtonComponent } from './store-header-login-button.component';

describe('StoreHeaderLoginButtonComponent', () => {
  let component: StoreHeaderLoginButtonComponent;
  let fixture: ComponentFixture<StoreHeaderLoginButtonComponent>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ StoreHeaderLoginButtonComponent ],
      providers: [
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

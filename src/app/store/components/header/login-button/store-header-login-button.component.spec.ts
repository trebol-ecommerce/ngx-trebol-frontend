/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { StoreLoginFormDialogComponent } from 'src/app/store/dialogs/login-form/store-login-form-dialog.component';
import { StoreHeaderLoginButtonComponent } from './store-header-login-button.component';

describe('StoreHeaderLoginButtonComponent', () => {
  let component: StoreHeaderLoginButtonComponent;
  let fixture: ComponentFixture<StoreHeaderLoginButtonComponent>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ StoreHeaderLoginButtonComponent ],
      providers: [
        { provide: MatDialog, useValue: mockDialogService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    fixture = TestBed.createComponent(StoreHeaderLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the login dialog', () => {
    component.onClickLogIn();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(
      StoreLoginFormDialogComponent,
      jasmine.any(Object)
    );
  })
});

/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { StoreGuestPromptDialogComponent } from './store-guest-prompt-dialog.component';
import { StoreGuestPromptDialogOptions } from './StoreGuestPromptDialogOptions';

describe('StoreGuestPromptDialogComponent', () => {
  let component: StoreGuestPromptDialogComponent;
  let fixture: ComponentFixture<StoreGuestPromptDialogComponent>;
  let mockDialogRef: Partial<MatDialogRef<StoreGuestPromptDialogComponent>>;
  let closeSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    mockDialogRef = {
      close() {}
    };
    closeSpy = spyOn(mockDialogRef, 'close');

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule
      ],
      declarations: [ StoreGuestPromptDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGuestPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when choosing any option', () => {
    component.onClickOption('');
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should close the dialog with a login option result value', () => {
    component.onClickOption('login');
    expect(closeSpy.calls.first().args[0]).toBe(StoreGuestPromptDialogOptions.login);
  });

  it('should close the dialog with a register option result value ', () => {
    component.onClickOption('register');
    expect(closeSpy.calls.first().args[0]).toBe(StoreGuestPromptDialogOptions.register);
  });

  it('should close the dialog with a guest option result value', () => {
    component.onClickOption('guest');
    expect(closeSpy.calls.first().args[0]).toBe(StoreGuestPromptDialogOptions.guest);
  });
});

// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of, EMPTY } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreLoginFormDialogComponent } from './store-login-form-dialog.component';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { DialogSwitcherButtonComponent } from 'src/app/shared/dialog-switcher-button/dialog-switcher-button.component';
import { CenteredMatProgressSpinnerComponent } from 'src/app/shared/centered-mat-spinner/component';

describe('StoreLoginFormDialogComponent', () => {
  let component: StoreLoginFormDialogComponent;
  let fixture: ComponentFixture<StoreLoginFormDialogComponent>;
  let dialog: Partial<MatDialogRef<StoreLoginFormDialogComponent>>;
  let appService: Partial<AppService>;
  let snackBarService: Partial<MatSnackBar>;

  beforeEach(waitForAsync(() => {
    dialog = {
      close() {}
    };
    appService = {
      login() { return EMPTY; },
      cancelAuthentication() {}
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      declarations: [
        StoreLoginFormDialogComponent,
        CenteredMatProgressSpinnerComponent,
        DialogSwitcherButtonComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialog },
        { provide: AppService, useValue: appService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLoginFormDialogComponent);
    component = fixture.componentInstance;
    snackBarService = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit incomplete form', () => {
    const appServiceLoginSpy = spyOn(appService, 'login').and.callThrough();
    component.onSubmit();
    component.username.setValue('test');
    component.onSubmit();
    component.formGroup.reset();
    component.password.setValue('test');
    component.onSubmit();
    expect(appServiceLoginSpy).not.toHaveBeenCalled();
  });

  it('should submit correct form', () => {
    const appServiceLoginSpy = spyOn(appService, 'login').and.callThrough();
    component.username.setValue('test');
    component.password.setValue('pass');
    component.onSubmit();
    expect(appServiceLoginSpy).toHaveBeenCalled();
  });

  it('should close upon cancellation', () => {
    const dialogCloseSpy = spyOn(dialog, 'close');
    component.onCancel();
    expect(dialogCloseSpy).toHaveBeenCalled();
  });
});
